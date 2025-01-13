import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  deleteMemoryById,
  getMemoryById,
} from "../../../Api/Client/Endpoints/UserMemoryApi";
import Loader from "../../../Components/Loaders/Loader";
import UpdateMemoriesModal from "./UpdateMemoryModal";
import ConfirmModal from "../../../Components/Modals/ConfirmModal";

interface ImageData {
  id: string;
  url: string | null;
  fileName: string;
  contentType: string;
  content: string; // Binary data in Base64
}

interface UserMemory {
  userId: string;
  memoryId: string;
  memoryName: string;
  description?: string;
  images: ImageData[];
  reminder: string;
}

const defaultImage = "https://via.placeholder.com/150?text=No+Image+Available";

function SingleMemoryPage() {
  const { memoryId } = useParams<{ memoryId: string }>();
  const [memory, setMemory] = useState<UserMemory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [memoryToUpdate, setMemoryToUpdate] = useState<UserMemory | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);

  const fetchMemory = async () => {
    try {
      setLoading(true);

      if (!memoryId) {
        throw new Error("Memory ID is missing.");
      }

      const response = await getMemoryById(memoryId);

      if (!response || !response.data) {
        throw new Error("Failed to fetch the memory.");
      }
      console.log("Response data:", response.data);
      setMemory(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching the memory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!memoryId) {
      alert("Memory id is required");
    }
    fetchMemory();
  }, [memoryId]);

  const handleEditClick = () => {
    setMemoryToUpdate(memory);
    setIsModalOpen(true); // Open the modal
  };
  const handleDeleteClick = async () => {
    if (!selectedMemoryId) {
      console.error("No memory ID selected.");
      return;
    }

    try {
      await deleteMemoryById(selectedMemoryId);
      console.log(`Memory with ID ${selectedMemoryId} has been deleted.`);
      closeConfirmModal();
      fetchUpdatedData(); // Funkce pro aktualizaci dat
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  const fetchUpdatedData = async () => {
    try {
      //await fetchMemories(); // Znovu načte vzpomínky z API
      console.log("Data successfully updated.");
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMemoryToUpdate(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!memoryToUpdate) return;
    const { name, value } = e.target;
    setMemoryToUpdate({ ...memoryToUpdate, [name]: value });
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

  if (!memory) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">Memory not found.</p>
      </div>
    );
  }

  const getImageUrl = (image: ImageData): string => {
    if (image.url) {
      return image.url; // If URL exists, use it
    }
    if (image.content) {
      return `data:${image.contentType};base64,${image.content}`;
    }
    return defaultImage; // Fallback to default image
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {memory.memoryName}
      </h2>
      <Card className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-lg">{memory.memoryName}</h4>
          <p className="text-sm text-default-500">{memory.reminder}</p>
          <Button
            color="danger"
            size="sm"
            variant="flat"
            onPress={() => openConfirmModal(memoryId)}>
            Delete
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
            height={300}
          />
          <p className="text-sm text-gray-600 mt-3">
            {memory.description || "No description available."}
          </p>
          <Button color="primary" className="mt-4" onPress={handleEditClick}>
            Edit Memory
          </Button>
        </CardBody>
      </Card>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDeleteClick}
        title="Confirm Deletion"
        message="Are you sure you want to delete this memory? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />

      <UpdateMemoriesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        memoryToUpdate={memoryToUpdate}
        handleInputChange={handleInputChange}
        memoryId={memoryId || ""} // Pass memoryId to modal
        fetchUpdatedMemory={fetchMemory} // Reload memory data after update
      />
    </div>
  );
}

export default SingleMemoryPage;
