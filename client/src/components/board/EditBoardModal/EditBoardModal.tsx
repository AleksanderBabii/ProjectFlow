import { useState } from "react";

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { Board } from "../../../types/board";

import styles from "./EditBoardModal.module.scss";

interface EditBoardModalProps {
  board: Board | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    data: {
      title: string;
      description?: string;
    }
  ) => void;
}

const EditBoardModal = ({
  board,
  isOpen,
  onClose,
  onSave,
}: EditBoardModalProps) => {
  const [form, setForm] = useState({
    title: board?.title ?? "",
    description: board?.description ?? "",
  });

  if (!board) return null;

  const handleSave = () => {
    const title = form.title.trim();
    const description = form.description.trim();

    if (!title) return;

    onSave(board.id, {
      title,
      description: description || undefined,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Board"
      onClose={onClose}
    >
      <div className={styles.form}>
        <Input
          label="Board title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          fullWidth
        />

        <Input
          label="Description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          fullWidth
        />

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={!form.title.trim()}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditBoardModal;