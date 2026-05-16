import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBlocker } from 'react-router';
import { useAppDispatch } from '@/shared/config/redux';
import { useAuthUserIdSelector } from '@/entities';
import {
  useContactsSelect,
  fetchContactsThunk,
  saveContactsThunk,
} from '@/entities/Contacts';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl';
import type { ContactType, ContactPlatform } from '@/shared/types/contacts.types';
import { mapToDrafts } from '../types/contactDraft.types';
import type { ContactDraft } from '../types/contactDraft.types';

type PendingNew = { value: string; type: ContactType; platform: ContactPlatform | null };

export const useContactsForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAuthUserIdSelector();
  const { contacts } = useContactsSelect(userId ?? '');

  const [drafts, setDrafts] = useState<ContactDraft[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const [pendingNew, setPendingNew] = useState<PendingNew | null>(null);
  const [inputKey, setInputKey] = useState(0);

  const { isOpen: isWarningOpen, open: openWarning, close: closeWarning } = useModalControl();

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchContactsThunk({ userId })).then((action) => {
      if (fetchContactsThunk.fulfilled.match(action)) {
        setDrafts(mapToDrafts(action.payload.contacts));
      } else {
        setDrafts(mapToDrafts(contacts));
      }
      setInitialized(true);
    });
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

  const showAddButton = pendingNew === null || pendingNew.value.length > 0;
  const isEmpty = drafts.length === 0 && pendingNew === null;

  const handleAddClick = useCallback(() => {
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
      if (!draft.id) return prev.filter((d) => d.tempId !== tempId);
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

  return {
    userId,
    drafts,
    initialized,
    isSaving,
    pendingNew,
    inputKey,
    hasUnsavedChanges,
    showAddButton,
    isEmpty,
    isWarningOpen,
    handleAddClick,
    handleNewValueChange,
    handleDiscardNew,
    handleEdit,
    handleToggleDelete,
    handleSave,
    handleCancel,
    handleLeave,
    handleStay,
  };
};
