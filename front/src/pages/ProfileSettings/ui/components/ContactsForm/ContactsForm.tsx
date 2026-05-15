import { useState, useCallback, useEffect, useMemo } from 'react';
import { useBlocker } from 'react-router';
import { useAppDispatch } from '@/shared/config/redux';
import { useAuthUserIdSelector } from '@/entities';
import {
  useContactsSelect,
  fetchContactsThunk,
  createContactThunk,
  updateContactThunk,
  deleteContactThunk,
} from '@/entities/Contacts';
import { Button, Typography, TypographyTypes } from '@/shared/ui';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl';
import type { UserContact, ContactType, ContactPlatform } from '@/shared/types/contacts.types';
import { ContactRow } from './ContactRow';
import { ContactInput } from './ContactInput';
import { UnsavedChangesModal } from './UnsavedChangesModal';
import type { ContactDraft } from './types';

const mapToDrafts = (contacts: UserContact[]): ContactDraft[] =>
  contacts.map((c) => ({
    tempId: c.id,
    id: c.id,
    value: c.value,
    type: c.type,
    platform: c.platform,
    isDeleted: false,
    originalValue: c.value,
  }));

type PendingNew = { value: string; type: ContactType; platform: ContactPlatform | null };

export const ContactsForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAuthUserIdSelector();
  const { contacts, isLoading } = useContactsSelect(userId ?? '');

  const [drafts, setDrafts] = useState<ContactDraft[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingNew, setPendingNew] = useState<PendingNew | null>(null);
  // Key that forces ContactInput to remount on each new session
  const [inputKey, setInputKey] = useState(0);

  const { isOpen: isWarningOpen, open: openWarning, close: closeWarning } = useModalControl();

  useEffect(() => {
    if (userId) dispatch(fetchContactsThunk({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!isLoading && !initialized) {
      setDrafts(mapToDrafts(contacts));
      setInitialized(true);
    }
  }, [contacts, isLoading, initialized]);

  const hasUnsavedChanges = useMemo(() => {
    const dirtyDrafts = drafts.some(
      (d) => d.isDeleted || !d.id || d.value !== d.originalValue,
    );
    const hasPendingNew = pendingNew !== null && pendingNew.value.trim().length > 0;
    return dirtyDrafts || hasPendingNew;
  }, [drafts, pendingNew]);

  const blocker = useBlocker(hasUnsavedChanges);

  useEffect(() => {
    if (blocker.state === 'blocked') openWarning();
  }, [blocker.state, openWarning]);

  // Button is hidden only when input is open AND empty
  const showAddButton = pendingNew === null || pendingNew.value.length > 0;

  const handleAddClick = useCallback(() => {
    // If current input has content — commit it to drafts first
    if (pendingNew && pendingNew.value.trim().length > 0) {
      setDrafts((prev) => [
        ...prev,
        {
          tempId: `new-${Date.now()}`,
          id: undefined,
          value: pendingNew.value.trim(),
          type: pendingNew.type,
          platform: pendingNew.platform,
          isDeleted: false,
          originalValue: undefined,
        },
      ]);
    }
    // Open a fresh input (force remount via key)
    setPendingNew({ value: '', type: 'social', platform: 'unknown' });
    setInputKey((k) => k + 1);
  }, [pendingNew]);

  const handleNewValueChange = useCallback(
    (value: string, type: ContactType, platform: ContactPlatform | null) => {
      setPendingNew({ value, type, platform });
    },
    [],
  );

  const handleDiscardNew = useCallback(() => setPendingNew(null), []);

  const handleEdit = useCallback(
    (tempId: string, value: string, type: ContactType, platform: ContactPlatform | null) => {
      setDrafts((prev) =>
        prev.map((d) => (d.tempId === tempId ? { ...d, value, type, platform } : d)),
      );
    },
    [],
  );

  const handleToggleDelete = useCallback((tempId: string) => {
    setDrafts((prev) => {
      const draft = prev.find((d) => d.tempId === tempId);
      if (!draft) return prev;
      // New uncommitted draft (no backend id) — remove entirely
      if (!draft.id) return prev.filter((d) => d.tempId !== tempId);
      // Existing contact — toggle deleted mark
      return prev.map((d) => (d.tempId === tempId ? { ...d, isDeleted: !d.isDeleted } : d));
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!userId) return;
    setIsSaving(true);
    try {
      const ops: Promise<unknown>[] = [];

      for (const draft of drafts) {
        if (draft.isDeleted && draft.id) {
          ops.push(dispatch(deleteContactThunk(draft.id)).unwrap());
        } else if (!draft.id && !draft.isDeleted && draft.value.trim().length > 0) {
          // New draft committed from the list (via second Add contact click)
          ops.push(
            dispatch(
              createContactThunk({ type: draft.type, value: draft.value.trim(), platform: draft.platform }),
            ).unwrap(),
          );
        } else if (draft.id && !draft.isDeleted && draft.value !== draft.originalValue) {
          ops.push(
            dispatch(
              updateContactThunk({ id: draft.id, dto: { value: draft.value, type: draft.type, platform: draft.platform } }),
            ).unwrap(),
          );
        }
      }

      if (pendingNew && pendingNew.value.trim().length > 0) {
        ops.push(
          dispatch(
            createContactThunk({ type: pendingNew.type, value: pendingNew.value.trim(), platform: pendingNew.platform }),
          ).unwrap(),
        );
      }

      await Promise.all(ops);
      await dispatch(fetchContactsThunk({ userId })).unwrap();
      setPendingNew(null);
      setInitialized(false);
    } finally {
      setIsSaving(false);
    }
  }, [dispatch, drafts, pendingNew, userId]);

  const handleCancel = useCallback(() => {
    setPendingNew(null);
    setInitialized(false);
  }, []);

  const handleLeave = useCallback(() => {
    closeWarning();
    blocker.proceed?.();
  }, [blocker, closeWarning]);

  const handleStay = useCallback(() => {
    closeWarning();
    blocker.reset?.();
  }, [blocker, closeWarning]);

  if (!userId) return null;

  const isEmpty = drafts.length === 0 && pendingNew === null;

  return (
    <div className="flex flex-col gap-3">
      <Typography bold type={TypographyTypes.H3}>
        Contacts
      </Typography>

      {isLoading && !initialized && (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
          Loading...
        </Typography>
      )}

      {!isLoading && isEmpty && (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
          No contacts added yet
        </Typography>
      )}

      {drafts.length > 0 && (
        <div className="flex flex-col divide-y divide-gray-100">
          {drafts.map((draft) => (
            <ContactRow
              key={draft.tempId}
              draft={draft}
              onEdit={handleEdit}
              onToggleDelete={handleToggleDelete}
            />
          ))}
        </div>
      )}

      {pendingNew !== null && (
        <ContactInput
          key={inputKey}
          onValueChange={handleNewValueChange}
          onDiscard={handleDiscardNew}
        />
      )}

      {showAddButton && (
        <Button variant="outlined" type="button" onClick={handleAddClick} className="w-full">
          + Add contact
        </Button>
      )}

      {hasUnsavedChanges && (
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
            className="grow"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="grow"
            disabled={isSaving}
          >
            Save
          </Button>
        </div>
      )}

      <UnsavedChangesModal
        isOpen={isWarningOpen}
        onStay={handleStay}
        onLeave={handleLeave}
      />
    </div>
  );
};
