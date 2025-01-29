import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { UserMemory } from "../../../Types/Memory/MemoryType";
import UpdateMemoryForm from "../../Forms/Memory/UpdateMemoryForm";
import CreateMemoryForm from "../../Forms/Memory/CreateMemoryForm";

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoryToUpdate: UserMemory | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fetchUpdatedMemory: () => void;
  action: string;
  memoryId: string;
}

const MemoryModal: React.FC<MemoryModalProps> = ({
  isOpen,
  onClose,
  memoryToUpdate,
  handleInputChange,
  fetchUpdatedMemory,
  action,
  memoryId,
}) => {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {action === "update" ? "Update Memory" : "Create Memory"}
        </ModalHeader>
        <ModalBody>
          {action === "update" ? (
            <UpdateMemoryForm
              memoryToUpdate={memoryToUpdate}
              handleInputChange={handleInputChange}
              fetchUpdatedMemory={fetchUpdatedMemory}
              onClose={onClose}
              memoryUpdatedId={memoryId} // do we need to pass memoryId to modal? We are already passing it in memoryToUpdate
            />
          ) : (
            <CreateMemoryForm
              handleInputChange={handleInputChange}
              fetchUpdatedMemory={fetchUpdatedMemory}
              userId={"6D3080D4-5DBF-4549-8AC1-77713785DE2A"}
              onClose={onClose}
            />
          )}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MemoryModal;
