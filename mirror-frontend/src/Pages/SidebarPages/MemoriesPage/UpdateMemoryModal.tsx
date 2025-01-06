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
import axios from "axios";
import { UserMemory } from "../../../Types/Memory/MemoryType";
import { updateMemoryById } from "../../../Api/Client/Endpoints/UserMemoryApi";

interface UpdateMemoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: UserMemory | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  memoryId: string; // ID aktuální vzpomínky
  fetchUpdatedMemory: () => void; // Callback na obnovení dat
}

const UpdateMemoriesModal: React.FC<UpdateMemoriesModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  memoryId,
  fetchUpdatedMemory,
}) => {
  const handleFormSubmit = async () => {
    if (!formData || !memoryId) {
      console.error("Form data or memory ID is missing.");
      return;
    }

    try {
      const requestPayload = {
        UserId: formData.userId,
        MemoryName: formData.memoryName,
        Description: formData.description,
        NewImages: [], // Zatím prázdné, pokud nepodporujeme nahrávání nových obrázků
        ExistingImageIds: formData.images.map((image) => image.id),
        Reminder: formData.reminder,
      };

      const formDataRequest = new FormData();
      formDataRequest.append("UserId", requestPayload.UserId);
      formDataRequest.append("MemoryName", requestPayload.MemoryName || "");
      formDataRequest.append("Description", requestPayload.Description || "");
      formDataRequest.append("Reminder", requestPayload.Reminder || "");

      requestPayload.ExistingImageIds.forEach((id) =>
        formDataRequest.append("ExistingImageIds", id)
      );

      requestPayload.NewImages.forEach((file) =>
        formDataRequest.append("NewImages", file)
      );

      const response = await updateMemoryById(memoryId, formDataRequest);

      console.log("Memory updated successfully:", response.data);

      // Aktualizace dat na frontendové straně
      fetchUpdatedMemory();

      // Zavření modalu
      onClose();
    } catch (error) {
      console.error("Error updating memory:", error);
    }
  };

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
