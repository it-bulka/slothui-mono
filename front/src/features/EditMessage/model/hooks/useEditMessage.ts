import { useAppDispatch, useAppSelector } from '@/shared/config/redux';
import { messagesAction, editMessageThunk } from '@/entities/Message/model';

export const useEditMessage = (msgId: string, chatId: string) => {
  const dispatch = useAppDispatch();
  const editingMessageId = useAppSelector((s) => s.messages.editingMessageId);
  const isEditing = editingMessageId === msgId;

  const startEdit = () => dispatch(messagesAction.setEditingMessage(msgId));
  const cancelEdit = () => dispatch(messagesAction.setEditingMessage(null));

  const submitEdit = async (text: string) => {
    await dispatch(editMessageThunk({ chatId, messageId: msgId, text })).unwrap();
    cancelEdit();
  };

  return { isEditing, startEdit, cancelEdit, submitEdit };
};
