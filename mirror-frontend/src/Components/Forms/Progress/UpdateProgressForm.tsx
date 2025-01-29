import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../../Types/Progress/ProgressType";
import apiClient from "../../../Api/Client/ApiClient";

type ProgressValueDTO = {
  progressColumnValue: string;
  progressDate_Day: number;
  progressDate_Month: number;
  progressDate_Year: number;
};

type UpdateProgressFormProps = {
  onClose: () => void;
  progress: Progress; // Existující data pro úpravu
};

function UpdateProgressForm({ onClose, progress }: UpdateProgressFormProps) {
  const [progressName, setProgressName] = useState(progress.progressName || "");
  const [progressColumnHeads, setProgressColumnHeads] = useState<string[]>(
    Object.keys(progress.progressValue || {})
  );
  const [progressValues, setProgressValues] = useState<
    Record<string, ProgressValueDTO[]>
  >(
    progress.progressValue?.reduce((acc, val) => {
      if (!acc[val.progressColumnValue]) {
        acc[val.progressColumnValue] = [];
      }
      acc[val.progressColumnValue].push(val);
      return acc;
    }, {} as Record<string, ProgressValueDTO[]>) || {}
  );
  const [description, setDescription] = useState(progress.description || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddColumnHead = () => {
    const newColumnHead = `Column${progressColumnHeads.length + 1}`;
    setProgressColumnHeads([...progressColumnHeads, newColumnHead]);
    setProgressValues({ ...progressValues, [newColumnHead]: [] });
  };

  const handleRemoveColumnHead = (column: string) => {
    const updatedColumns = progressColumnHeads.filter(
      (head) => head !== column
    );
    const updatedValues = { ...progressValues };
    delete updatedValues[column];
    setProgressColumnHeads(updatedColumns);
    setProgressValues(updatedValues);
  };

  const handleAddProgressValue = (column: string) => {
    const updatedColumnValues = [
      ...(progressValues[column] || []),
      {
        progressColumnValue: "",
        progressDate_Day: 1,
        progressDate_Month: 1,
        progressDate_Year: 2024,
      },
    ];
    setProgressValues({ ...progressValues, [column]: updatedColumnValues });
  };

  const handleRemoveProgressValue = (column: string, index: number) => {
    const updatedColumnValues = (progressValues[column] || []).filter(
      (_, i) => i !== index
    );
    setProgressValues({ ...progressValues, [column]: updatedColumnValues });
  };

  const handleUpdateProgressValue = (
    column: string,
    index: number,
    field: keyof ProgressValueDTO,
    value: any
  ) => {
    const updatedColumnValues = [...(progressValues[column] || [])];
    updatedColumnValues[index] = {
      ...updatedColumnValues[index],
      [field]: value,
    };
    setProgressValues({ ...progressValues, [column]: updatedColumnValues });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const dataToSubmit: Progress = {
      description,
      progressName,
      progressColumnHead: progressColumnHeads.join(","),
      progressValue: Object.values(progressValues).flat(),
    };

    try {
      const response = await apiClient.put(
        `progress/${progress.progressName}`,
        dataToSubmit
      );
      alert("Progress successfully updated!");
      console.log("Server response:", response.data);

      onClose();
    } catch (error) {
      alert("Failed to update progress. Please try again.");
      console.error("Error updating progress:", error);
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

      <label
        htmlFor="description"
        className="block mt-4 text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter description"
      />

      {/* Column Heads and Values */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Progress Values</h3>
        {progressColumnHeads.map((column) => (
          <div key={column} className="mt-4">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-gray-600">{column}</h4>
              <button
                type="button"
                onClick={() => handleRemoveColumnHead(column)}
                className="inline-flex items-center px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800">
                Remove Column
              </button>
            </div>
            {(progressValues[column] || []).map((value, index) => (
              <div key={index} className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Column Value"
                  value={value.progressColumnValue}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      column,
                      index,
                      "progressColumnValue",
                      e.target.value
                    )
                  }
                  className="block w-1/3 rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <input
                  type="number"
                  placeholder="Day"
                  value={value.progressDate_Day}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      column,
                      index,
                      "progressDate_Day",
                      parseInt(e.target.value)
                    )
                  }
                  className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <input
                  type="number"
                  placeholder="Month"
                  value={value.progressDate_Month}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      column,
                      index,
                      "progressDate_Month",
                      parseInt(e.target.value)
                    )
                  }
                  className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={value.progressDate_Year}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      column,
                      index,
                      "progressDate_Year",
                      parseInt(e.target.value)
                    )
                  }
                  className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProgressValue(column, index)}
                  className="inline-flex items-center px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddProgressValue(column)}
              className="inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800 mt-2">
              Add Value
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddColumnHead}
          className="inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800 mt-2">
          Add Column Head
        </button>
      </div>

      {/* Submit and Cancel Buttons */}
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

export default UpdateProgressForm;
