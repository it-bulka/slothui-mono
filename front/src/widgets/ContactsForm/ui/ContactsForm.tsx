import { Button, Typography, TypographyTypes } from '@/shared/ui';
import { useContactsForm } from '../model/hooks/useContactsForm';
import { ContactRow } from './ContactRow';
import { ContactInput } from './ContactInput';
import { UnsavedChangesModal } from './UnsavedChangesModal';

export const ContactsForm = () => {
  const {
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
  } = useContactsForm();

  if (!userId) return null;

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
