import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { getMemoryById } from "../../../Api/Client/Endpoints/UserMemoryApi";
import Loader from "../../../Components/Loaders/Loader";
import UpdateMemoriesModal from "./UpdateMemoryModal";

interface ImageData {
  id: string;
  url: string | null;
  fileName: string;
  contentType: string;
  content: string; // Binary data in Base64
}

interface UserMemory {
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
  const [formData, setFormData] = useState<UserMemory | null>(null);

  useEffect(() => {
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

        setMemory(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the memory.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [memoryId]);

  const handleEditClick = () => {
    setFormData(memory); // Pre-fill the form with current memory data
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    // TODO: Implement the update logic here (e.g., API call to update the memory)
    console.log("Form data submitted:", formData);
    handleCloseModal();
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

      <UpdateMemoriesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default SingleMemoryPage;
