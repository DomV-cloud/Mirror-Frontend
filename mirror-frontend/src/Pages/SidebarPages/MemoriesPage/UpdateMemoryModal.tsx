import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
  Alert,
  Image,
} from "@nextui-org/react";
import { UserMemory } from "../../../Types/Memory/MemoryType";
import { updateMemoryById } from "../../../Api/Client/Endpoints/UserMemoryApi";

interface UpdateMemoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoryToUpdate: UserMemory | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  memoryId: string; // ID aktuální vzpomínky
  fetchUpdatedMemory: () => void; // Callback na obnovení dat
}

const UpdateMemoriesModal: React.FC<UpdateMemoriesModalProps> = ({
  isOpen,
  onClose,
  memoryToUpdate,
  handleInputChange,
  memoryId,
  fetchUpdatedMemory,
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(
    memoryToUpdate?.images || []
  );
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
  };

  const handleExistingImageRemove = (id: string) => {
    setExistingImages(existingImages.filter((image) => image.id !== id));
  };

  const handleFormSubmit = async () => {
    if (!memoryToUpdate || !memoryId) {
      setAlert({
        type: "error",
        message: "Form data or memory ID is missing.",
      });
      return;
    }

    try {
      const requestPayload = {
        UserId: memoryToUpdate.userId,
        MemoryName: memoryToUpdate.memoryName,
        Description: memoryToUpdate.description,
        NewImages: newImages,
        ExistingImageIds: existingImages.map((image) => image.id),
        Reminder: memoryToUpdate.reminder,
      };

      const memoryToUpdateRequest = new FormData();
      memoryToUpdateRequest.append("UserId", requestPayload.UserId);
      memoryToUpdateRequest.append(
        "MemoryName",
        requestPayload.MemoryName || ""
      );
      memoryToUpdateRequest.append(
        "Description",
        requestPayload.Description || ""
      );
      memoryToUpdateRequest.append("Reminder", requestPayload.Reminder || "");

      requestPayload.ExistingImageIds.forEach((id) =>
        memoryToUpdateRequest.append("ExistingImageIds", id)
      );

      requestPayload.NewImages.forEach((file) =>
        memoryToUpdateRequest.append("NewImages", file)
      );

      const response = await updateMemoryById(memoryId, memoryToUpdateRequest);

      if (!response.data) {
        setAlert({ type: "error", message: response.statusText });
      }

      setAlert({ type: "success", message: "Memory updated successfully!" });

      fetchUpdatedMemory();

      onClose();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error updating memory. Please try again.",
      });
      console.error("Error updating memory:", error);
    }
  };

  useEffect(() => {
    if (memoryToUpdate) {
      setExistingImages(memoryToUpdate.images || []);
    }
    console.log("Memory", memoryToUpdate);
  }, [memoryToUpdate]);

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update Memory</ModalHeader>
        <ModalBody>
          {/*Here I would make alone-stand component */}
          {alert && (
            <Alert color={alert.type === "success" ? "success" : "error"}>
              {alert.message}
            </Alert>
          )}
          <Input
            label="Memory Name"
            value={memoryToUpdate?.memoryName || ""}
            onChange={handleInputChange}
            name="memoryName"
            placeholder="Enter memory name"
            variant="bordered"
          />
          <Textarea
            label="Description"
            value={memoryToUpdate?.description || ""}
            onChange={handleInputChange}
            name="description"
            placeholder="Enter description"
            rows={4}
            variant="bordered"
          />
          <Input
            label="Reminder"
            value={memoryToUpdate?.reminder || ""}
            onChange={handleInputChange}
            name="reminder"
            placeholder="Enter reminder"
            variant="bordered"
          />

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Existing Images
            </label>
            {existingImages.length === 0 ? (
              <p className="text-sm text-gray-500">No images available.</p>
            ) : (
              <div
                className="max-h-40 overflow-y-auto space-y-2"
                style={{ scrollbarWidth: "thin" }}>
                <ul className="list-disc pl-4 space-y-2">
                  {existingImages.map((image) => (
                    <li
                      key={image.id}
                      className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">
                        {image.fileName}
                      </span>
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => handleExistingImageRemove(image.id)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload New Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="mt-4">
              {newImages.length > 0 && (
                <div className="flex items-center space-x-4">
                  <Image
                    alt={newImages[newImages.length - 1].name}
                    src={URL.createObjectURL(newImages[newImages.length - 1])}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  {newImages.length > 1 && (
                    <span className="text-sm text-gray-800">
                      +{newImages.length - 1} more images
                    </span>
                  )}
                  <Button
                    color="danger"
                    size="sm"
                    variant="flat"
                    onPress={() => setNewImages([])}>
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </div>
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
