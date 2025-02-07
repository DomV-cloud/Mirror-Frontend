import { useEffect, useState } from "react";
import { Progress } from "../../Types/Progress/ProgressType";
import { getUserProgressesById } from "../../Api/Client/Endpoints/UserApi";
import ProgressCard from "../../Components/ProgressCard";
import { Button } from "@nextui-org/react";
import ProgressModal from "../../Components/Modals/Progress/ProgressModal";

// Custom hook for fetching data
const useFetchData = (userId: string) => {
  const [state, setState] = useState({
    progresses: [] as Progress[],
    loading: true,
    error: null as string | null,
  });

  const fetchData = async () => {
    try {
      const response = await getUserProgressesById(userId);
      setState({ progresses: response.data, loading: false, error: null });
    } catch (error) {
      console.error("Failed to fetch progresses:", error);
      setState({
        progresses: [],
        loading: false,
        error: "Failed to load data.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { ...state, refetch: fetchData };
};

export default function MyProgressPage() {
  const userId = "6D3080D4-5DBF-4549-8AC1-77713785DE2A";
  const { progresses, loading, error } = useFetchData(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"create" | "update">("create");
  const [progressToUpdate, setProgressToUpdate] = useState<Progress | null>(
    null
  );

  const handleAddProgress = () => {
    setAction("create");
    setProgressToUpdate(null);
    setIsModalOpen(true);
  };

  const handleUpdateProgress = (progress: Progress) => {
    setAction("update");
    setProgressToUpdate(progress);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-300 h-32 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      <ProgressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        progressToUpdate={progressToUpdate}
        action={action}
        userId={userId}
      />

      <div className="flex justify-end p-4">
        <Button color="primary" onPress={handleAddProgress}>
          Add Progress
        </Button>
      </div>
      {progresses.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">No progresses to show.</p>
          <Button color="primary" onPress={handleAddProgress}>
            Add Progress
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {progresses.map((progress) => (
            <ProgressCard
              key={progress.id}
              displayActiveProgress={progress}
              onEdit={() => handleUpdateProgress(progress)} // Callback pro editaci
            />
          ))}
        </div>
      )}
    </div>
  );
}
