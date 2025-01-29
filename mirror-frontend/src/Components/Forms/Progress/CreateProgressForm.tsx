import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pro navigaci
import { createProgress } from "../../../Api/Client/Endpoints/progressValueApi";

type CreateProgressFormProps = {
  onClose: () => void;
};

type ProgressValueDto = {
  id: number;
  ProgressColumnHead: string;
  ProgressColumnValue: string;
  ProgressDate_Day: number;
  ProgressDate_Month: number;
  ProgressDate_Year: number;
};

function CreateProgressForm({ onClose }: CreateProgressFormProps) {
  const [progressName, setProgressName] = useState("");
  const [progressValues, setProgressValues] = useState<ProgressValueDto[]>([]);
  const [userId] = useState("6D3080D4-5DBF-4549-8AC1-77713785DE2A");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddProgressValue = () => {
    setProgressValues([
      ...progressValues,
      {
        id: Date.now(),
        ProgressColumnHead: "",
        ProgressColumnValue: "",
        ProgressDate_Day: 1,
        ProgressDate_Month: 1,
        ProgressDate_Year: new Date().getFullYear(),
      },
    ]);
  };

  const handleRemoveProgressValue = (id: number) => {
    setProgressValues(progressValues.filter((value) => value.id !== id));
  };

  const handleUpdateProgressValue = (
    id: number,
    field: keyof ProgressValueDto,
    value: any
  ) => {
    setProgressValues(
      progressValues.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      ProgressName: progressName,
      ProgressValue: progressValues.map(({ id, ...rest }) => rest), // Odebereme lokální `id`
      UserId: userId,
    };

    try {
      const response = await createProgress(dataToSubmit);

      alert("Progress successfully created!");
      const id = response.data.createdProgressId;

      // Reset formuláře
      setProgressName("");
      setProgressValues([]);
      onClose();
      navigate(`/progress/${id}`);
    } catch (error) {
      alert("Failed to create progress. Please try again.");
      console.error("Error creating progress:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {loading && <p>Loading...</p>}

      <label
        htmlFor="progressName"
        className="block text-sm font-medium text-gray-700">
        Progress Name
      </label>
      <input
        id="progressName"
        type="text"
        value={progressName}
        onChange={(e) => setProgressName(e.target.value)}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter progress name"
      />

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Progress Values</h3>
        {progressValues.map((value) => (
          <div key={value.id} className="mt-2 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Column Head"
              value={value.ProgressColumnHead}
              onChange={(e) =>
                handleUpdateProgressValue(
                  value.id,
                  "ProgressColumnHead",
                  e.target.value
                )
              }
              className="block w-1/4 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <input
              type="text"
              placeholder="Column Value"
              value={value.ProgressColumnValue}
              onChange={(e) =>
                handleUpdateProgressValue(
                  value.id,
                  "ProgressColumnValue",
                  e.target.value
                )
              }
              className="block w-1/4 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <input
              type="number"
              placeholder="Day"
              value={value.ProgressDate_Day}
              onChange={(e) =>
                handleUpdateProgressValue(
                  value.id,
                  "ProgressDate_Day",
                  parseInt(e.target.value)
                )
              }
              className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <input
              type="number"
              placeholder="Month"
              value={value.ProgressDate_Month}
              onChange={(e) =>
                handleUpdateProgressValue(
                  value.id,
                  "ProgressDate_Month",
                  parseInt(e.target.value)
                )
              }
              className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <input
              type="number"
              placeholder="Year"
              value={value.ProgressDate_Year}
              onChange={(e) =>
                handleUpdateProgressValue(
                  value.id,
                  "ProgressDate_Year",
                  parseInt(e.target.value)
                )
              }
              className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveProgressValue(value.id)}
              className="inline-flex items-center px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleAddProgressValue}
          className="inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
          Add Progress Value
        </button>
      </div>

      <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateProgressForm;
