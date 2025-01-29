import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  ModalHeader,
  ModalBody,
  ModalContent,
  Modal,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { getUserMemoriesById } from "../../../Api/Client/Endpoints/UserApi";
import Loader from "../../../Components/Loaders/Loader";
import MemoryModal from "../../../Components/Modals/Memory/MemoryModal";
import { UserMemory } from "../../../Types/Memory/MemoryType";
import { deleteMemoryById } from "../../../Api/Client/Endpoints/UserMemoryApi";
import ConfirmModal from "../../../Components/Modals/ConfirmModal";
import RemoveIcon from "../../../Components/Icons/RemoveIcon";

interface ImageData {
  id: string;
  url: string | null;
  fileName: string;
  contentType: string;
  content: string;
}

const defaultImage = "https://picsum.photos/id/237/200/300";

const getImageUrl = (image: ImageData): string => {
  if (image.url) {
    return image.url;
  }
  if (image.content) {
    return `data:${image.contentType};base64,${image.content}`;
  }
  return defaultImage;
};

function MemoriesPage() {
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [userId] = useState<string>("6D3080D4-5DBF-4549-8AC1-77713785DE2A");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<"create" | "update">("create");
  const [memoryToUpdate, setMemoryToUpdate] = useState<UserMemory | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRedirectClick = (memoryId: string | undefined) => {
    if (!memoryId) {
      return;
    }
    navigate(`/memories/${memoryId}`);
  };

  const fetchMemories = async () => {
    try {
      setLoading(true);

      const response = await getUserMemoriesById(userId);

      if (!response) {
        throw new Error("No memories found");
      }

      setMemories(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching memories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!selectedMemoryId) {
      console.error("No memory ID selected.");
      return;
    }

    try {
      await deleteMemoryById(selectedMemoryId);
      closeConfirmModal();
      fetchMemories();
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, [userId]);

  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);

  const openCreateMemoryModal = () => {
    setModalAction("create");
    setMemoryToUpdate(null);
    setIsModalOpen(true);
  };

  const openUpdateMemoryModal = (memory: UserMemory) => {
    setModalAction("update");
    setMemoryToUpdate(memory);
    setIsModalOpen(true);
    console.log("Opening update memory modal");
    console.log(isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmModal = (id?: string) => {
    if (!id) {
      console.error("Memory ID is undefined or invalid.");
      return;
    }

    setSelectedMemoryId(id);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedMemoryId(null);
    setIsConfirmModalOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center gap-2">
        <p className="text-lg font-semibold text-gray-500">
          No memories available.
        </p>
        <Button
          color="primary"
          variant="shadow"
          className="text-lg px-6 py-3 rounded-lg"
          onPress={openCreateMemoryModal}>
          Add Memory
        </Button>

        <MemoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          memoryToUpdate={memoryToUpdate}
          handleInputChange={() => {}}
          fetchUpdatedMemory={fetchMemories}
          action={modalAction}
          memoryId={memoryToUpdate?.memoryId || ""}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-row items-center justify-between mb-6 flex-wrap">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Your Memories
        </h2>
        <Button color="primary" onPress={openCreateMemoryModal}>
          Add Memory
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <Card
            key={memory.memoryId}
            className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            isPressable
            onPress={() => openUpdateMemoryModal(memory)}>
            <CardHeader className="pb-0 pt-2 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-start">
                <h4 className="font-bold text-lg text-gray-800">
                  {memory.memoryName}
                </h4>
                <p className="text-sm text-default-500">{memory.reminder}</p>
              </div>
              <Button
                color="danger"
                size="sm"
                variant="flat"
                className="mt-2 sm:mt-0"
                onPress={() => openConfirmModal(memory.memoryId)}>
                <RemoveIcon />
              </Button>
            </CardHeader>

            <CardBody className="py-2 px-4">
              <Image
                alt={`Image for ${memory.memoryName}`}
                src={
                  memory.images.length > 0
                    ? getImageUrl(memory.images[0])
                    : defaultImage
                }
                className="object-cover rounded-lg"
                width="100%"
                height={180}
              />
              <p className="text-sm text-gray-600 mt-3">
                {memory.description || "No description available."}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <MemoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        memoryToUpdate={memoryToUpdate}
        handleInputChange={() => {}}
        fetchUpdatedMemory={fetchMemories}
        action={modalAction}
        memoryId={memoryToUpdate?.memoryId || ""}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDeleteClick}
        title="Confirm Deletion"
        message="Are you sure you want to delete this memory? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default MemoriesPage;
