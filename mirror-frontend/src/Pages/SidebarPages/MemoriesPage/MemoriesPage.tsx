import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getUserMemoriesById } from "../../../Api/Client/Endpoints/UserApi";
import Loader from "../../../Components/Loaders/Loader";

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

const defaultImage = "https://picsum.photos/id/237/200/300";

// Helper function to convert binary data to Base64 URL
const getImageUrl = (image: ImageData): string => {
  if (image.url) {
    return image.url; // If URL exists, use it
  }
  if (image.content) {
    return `data:${image.contentType};base64,${image.content}`;
  }
  return defaultImage; // Fallback to default image
};

function MemoriesPage() {
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [userId] = useState<string>("6D3080D4-5DBF-4549-8AC1-77713785DE2A");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRedirectClick = (memoryId: string | undefined) => {
    console.log("Redirecting to memory with ID:", memoryId);
    if (!memoryId) {
      console.error("Invalid memory ID:", memoryId);
      return;
    }
    navigate(`/memories/${memoryId}`);
    console.log("Redirecting to memory with ID:", memoryId);
  };
  
 
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);

        const response = await getUserMemoriesById(userId);

        if (!response || !response.data || response.data.length === 0) {
          throw new Error("No memories found");
        }

        console.log("Response data:", response.data);

        setMemories(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching memories.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, [userId]);

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
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">No memories available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Memories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <Card
            key={memory.memoryId}
            className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            isPressable
            onPress={() => handleRedirectClick(memory.memoryId)} // Přesměrování po kliknutí
          >
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
                height={180}
              />
              <p className="text-sm text-gray-600 mt-3">
                {memory.description || "No description available."}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MemoriesPage;
