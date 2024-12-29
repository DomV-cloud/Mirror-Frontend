// src/Components/Modals/UpdateMemoriesModal.tsx
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { UserMemory } from "../../../Types/Memory/MemoryType";

interface UpdateMemoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: UserMemory | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: () => void;
}

const UpdateMemoriesModal: React.FC<UpdateMemoriesModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update Memory</ModalHeader>
        <ModalBody>
          <Input
            label="Memory Name"
            value={formData?.memoryName || ""}
            onChange={handleInputChange}
            name="memoryName"
            placeholder="Enter memory name"
            variant="bordered"
          />
          <Textarea
            label="Description"
            value={formData?.description || ""}
            onChange={handleInputChange}
            name="description"
            placeholder="Enter description"
            rows={4}
            variant="bordered"
          />
          <Input
            label="Reminder"
            value={formData?.reminder || ""}
            onChange={handleInputChange}
            name="reminder"
            placeholder="Enter reminder"
            variant="bordered"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleFormSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateMemoriesModal;
