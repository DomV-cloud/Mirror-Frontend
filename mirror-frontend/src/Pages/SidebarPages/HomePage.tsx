import { useState, useEffect } from "react";
import AddChartGrid from "../../Components/AddChartGrid";
import DisplayProgresses from "../../Components/DisplayProgresses";
import { Progress } from "../../Types/Progress/ProgressType";
import { getUserProgressesById } from "../../Api/Client/Endpoints/UserApi";
import Loader from "../../Components/Loaders/Loader";

function HomePage() {
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = "6D3080D4-5DBF-4549-8AC1-77713785DE2A";

  const fetchData = async (userId: string) => {
    try {
      const response = await getUserProgressesById(userId);
      setProgresses(response.data);
    } catch (error) {
      console.error("Failed to fetch progresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      {progresses.length === 0 ? (
        <AddChartGrid />
      ) : (
        <DisplayProgresses progresses={progresses} />
      )}
    </div>
  );
}

export default HomePage;
