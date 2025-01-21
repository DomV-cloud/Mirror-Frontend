import React, { useEffect, useState } from "react";
import { Input, Textarea, Button, Alert, Image } from "@nextui-org/react";
import { UserMemory } from "../../../Types/Memory/MemoryType";
import { updateMemoryById } from "../../../Api/Client/Endpoints/UserMemoryApi";

interface UpdateMemoryFormProps {
  memoryToUpdate: UserMemory | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fetchUpdatedMemory: () => void;
  onClose: () => void;
  memoryUpdatedId: string;
}

const UpdateMemoryForm: React.FC<UpdateMemoryFormProps> = ({
  memoryToUpdate,
  handleInputChange,
  fetchUpdatedMemory,
  onClose,
  memoryUpdatedId,
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(
    memoryToUpdate?.images || []
  );
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (memoryToUpdate) {
      setExistingImages(memoryToUpdate.images || []);
      setImagesToDelete([]);
      setNewImages([]);
    }
  }, [memoryToUpdate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
  };

  const handleFormSubmit = async () => {
    if (!memoryToUpdate) {
      setAlert({ type: "error", message: "Form data is missing." });
      return;
    }

    try {
      const memoryToUpdateRequest = new FormData();
      memoryToUpdateRequest.append("UserId", memoryToUpdate.userId);
      memoryToUpdateRequest.append(
        "MemoryName",
        memoryToUpdate.memoryName || ""
      );
      memoryToUpdateRequest.append(
        "Description",
        memoryToUpdate.description || ""
      );
      memoryToUpdateRequest.append("Reminder", memoryToUpdate.reminder || "");

      imagesToDelete.forEach((id) =>
        memoryToUpdateRequest.append("ImagesToDelete", id)
      );
      newImages.forEach((file) =>
        memoryToUpdateRequest.append("NewImages", file)
      );

      const response = await updateMemoryById(
        memoryUpdatedId,
        memoryToUpdateRequest
      );

      if (!response.data) {
        setAlert({ type: "error", message: response.statusText });
        return;
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

  const handleExistingImageRemove = (id: string) => {
    setExistingImages(existingImages.filter((image) => image.id !== id));
    setImagesToDelete([...imagesToDelete, id]);
  };

  return (
    <div className="space-y-6">
      {alert && (
        <Alert
          color={alert.type === "success" ? "success" : "error"}
          className="text-center">
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
        className="w-full"
      />

      <Textarea
        label="Description"
        value={memoryToUpdate?.description || ""}
        onChange={handleInputChange}
        name="description"
        placeholder="Enter description"
        rows={4}
        variant="bordered"
        className="w-full"
      />

      <Input
        label="Reminder"
        value={memoryToUpdate?.reminder || ""}
        onChange={handleInputChange}
        name="reminder"
        placeholder="Enter reminder"
        variant="bordered"
        className="w-full"
      />

      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Existing Images
        </label>
        {existingImages.length === 0 ? (
          <p className="text-sm text-gray-500">No images available.</p>
        ) : (
          <div className="overflow-y-auto max-h-40 border border-gray-300 rounded-md p-3">
            <ul className="space-y-2">
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
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
        />
        <div className="mt-4">
          {newImages.length > 0 && (
            <div className="flex flex-wrap gap-4 items-center">
              {newImages.map((file, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image
                    alt={file.name}
                    src={URL.createObjectURL(file)}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
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

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button
          color="primary"
          className="w-full sm:w-auto"
          onPress={handleFormSubmit}>
          Update Memory
        </Button>
        <Button
          color="danger"
          variant="flat"
          className="w-full sm:w-auto"
          onPress={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default UpdateMemoryForm;
