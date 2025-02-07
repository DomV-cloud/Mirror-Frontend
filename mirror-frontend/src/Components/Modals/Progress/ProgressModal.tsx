import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { Progress } from "../../../Types/Progress/ProgressType";
import UpdateProgressForm from "../../Forms/Progress/UpdateProgressForm";
import CreateProgressForm from "../../Forms/Progress/CreateProgressForm";
import { ActionType } from "../../../Types/Action/ActionType";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progressToUpdate?: Progress | null;
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  action: ActionType;
  userId: string;
}

const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  progressToUpdate,
  handleInputChange,
  action,
  userId,
}) => {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {action === "update" ? "Update Progress" : "Create Progress"}
        </ModalHeader>
        <ModalBody>
          {action === "update" ? (
            <UpdateProgressForm
              onClose={onClose}
              progress={progressToUpdate!} // Používáme `!` protože `progressToUpdate` je povinný při aktualizaci
            />
          ) : (
            <CreateProgressForm userId={userId} onClose={onClose} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProgressModal;
