import { useState, useEffect } from "react";
import AddChartGrid from "../../Components/AddChartGrid";
import DisplayActiveProgress from "../../Components/DisplayActiveProgress";
import { Progress } from "../../Types/Progress/ProgressType";
import { getActiveUserProgressById } from "../../Api/Client/Endpoints/UserApi";
import Loader from "../../Components/Loaders/Loader";

function HomePage() {
  const [activeProgress, setActiveProgress] = useState<Progress>();
  const [loading, setLoading] = useState<boolean>(true);
  const userId = "6D3080D4-5DBF-4549-8AC1-77713785DE2A";

  const fetchData = async (userId: string) => {
    try {
      const response = await getActiveUserProgressById(userId);
      setActiveProgress(response.data);
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

  // I should there display progress marked "Active"
  // I would there make a request with progreses sort by Active (There is only one progress marked as Active so there would be displayed)
  return (
    <div className="w-full">
      {activeProgress === undefined ? (
        <AddChartGrid />
      ) : (
        <DisplayActiveProgress displayActiveProgress={activeProgress} />
      )}
    </div>
  );
}

export default HomePage;
