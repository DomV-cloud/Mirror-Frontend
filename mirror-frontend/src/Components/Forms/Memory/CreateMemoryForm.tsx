import React, { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Alert,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { createMemory } from "../../../Api/Client/Endpoints/UserMemoryApi";

interface CreateMemoryFormProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fetchUpdatedMemory: () => void;
  userId: string;
  onClose: () => void;
}

const reminderOptions = [
  { key: "Daily", label: "Daily" },
  { key: "Weekly", label: "Weekly" },
  { key: "Monthly", label: "Monthly" },
  { key: "Yearly", label: "Yearly" },
];

const CreateMemoryForm: React.FC<CreateMemoryFormProps> = ({
  fetchUpdatedMemory,
  userId,
  onClose,
}) => {
  const [memoryName, setMemoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("Uploading images:", Array.from(e.target.files));
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = async () => {
    if (!userId || !memoryName || !selectedReminder) {
      setAlert({
        type: "error",
        message: "User ID, memory name, and reminder are required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("UserId", userId);
    formData.append("MemoryName", memoryName);
    formData.append("Description", description || "");
    formData.append("Reminder", selectedReminder);

    newImages.forEach((file) => {
      formData.append("Images", file);
    });

    try {
      console.log("Creating memory with images:", formData);
      const response = await createMemory(formData);

      if (!response.data) {
        setAlert({
          type: "error",
          message: response.statusText || "Error creating memory.",
        });
        return;
      }

      setAlert({ type: "success", message: "Memory created successfully!" });
      setNewImages([]);
      onClose();
      fetchUpdatedMemory();
    } catch (error) {
      console.error("Error creating memory:", error);
      setAlert({
        type: "error",
        message: "An error occurred while creating the memory.",
      });
    }
  };

  return (
    <div>
      {alert && (
        <Alert color={alert.type === "success" ? "success" : "error"}>
          {alert.message}
        </Alert>
      )}
      <Input
        label="Memory Name"
        value={memoryName}
        onChange={(e) => setMemoryName(e.target.value)}
        name="memoryName"
        placeholder="Enter memory name"
        variant="bordered"
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
        placeholder="Enter description"
        rows={4}
        variant="bordered"
      />
      <Select
        label="Reminder"
        placeholder="Select reminder frequency"
        selectedKeys={
          selectedReminder ? new Set([selectedReminder]) : new Set()
        }
        variant="bordered"
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string; // Extract first selected value
          setSelectedReminder(selected);
        }}>
        {reminderOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
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
      <div className="mt-6">
        <Button color="primary" onPress={handleSubmit}>
          Create Memory
        </Button>
      </div>
    </div>
  );
};

export default CreateMemoryForm;
