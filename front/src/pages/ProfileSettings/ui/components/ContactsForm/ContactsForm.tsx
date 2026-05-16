import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBlocker } from 'react-router';
import { useAppDispatch } from '@/shared/config/redux';
import { useAuthUserIdSelector } from '@/entities';
import {
  useContactsSelect,
  fetchContactsThunk,
  saveContactsThunk,
} from '@/entities/Contacts';
import { Button, Typography, TypographyTypes } from '@/shared/ui';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl';
import type { ContactType, ContactPlatform, UserContact } from '@/shared/types/contacts.types';
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
  const { contacts } = useContactsSelect(userId ?? '');

  const [drafts, setDrafts] = useState<ContactDraft[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const [pendingNew, setPendingNew] = useState<PendingNew | null>(null);
  // Key that forces ContactInput to remount on each new session
  const [inputKey, setInputKey] = useState(0);

  const { isOpen: isWarningOpen, open: openWarning, close: closeWarning } = useModalControl();

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchContactsThunk({ userId }))
      .unwrap()
      .then(({ contacts: loaded }) => {
        setDrafts(mapToDrafts(loaded));
        setInitialized(true);
      })
      .catch(() => setInitialized(true));
  }, [dispatch, userId]);

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
    if (!userId || isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);
    try {
      const items = [
        ...drafts
          .filter((d) => !d.isDeleted && d.value.trim().length > 0)
          .map((d) => ({ id: d.id, type: d.type, value: d.value.trim(), platform: d.platform })),
        ...(pendingNew && pendingNew.value.trim().length > 0
          ? [{ type: pendingNew.type, value: pendingNew.value.trim(), platform: pendingNew.platform }]
          : []),
      ];

      const { contacts: fresh } = await dispatch(saveContactsThunk({ items, userId })).unwrap();
      setPendingNew(null);
      setDrafts(mapToDrafts(fresh));
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, [dispatch, drafts, pendingNew, userId]);

  const handleCancel = useCallback(() => {
    setPendingNew(null);
    setDrafts(mapToDrafts(contacts));
  }, [contacts]);

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
      <Typography bold type={TypographyTypes.BLOCK_TITLE}>
        Contacts
      </Typography>

      {!initialized && (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
          Loading...
        </Typography>
      )}

      {initialized && isEmpty && (
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
