import { useState } from "react";
import { Progress } from "../../../Types/Progress/ProgressType";
import apiClient from "../../../Api/Client/ApiClient";
import { ProgressSection } from "../../../Types/ProgressSection/ProgressSection";

type ProgressValueDTO = {
  progressColumnValue: string;
  progressDate_Day: number;
  progressDate_Month: number;
  progressDate_Year: number;
};

type ProgressSectionDTO = {
  sectionId: string;
  sectionName: string;
  progressValues: ProgressValueDTO[];
};

type UpdateProgressFormProps = {
  onClose: () => void;
  progress: Progress;
};

function UpdateProgressForm({ onClose, progress }: UpdateProgressFormProps) {
  const [progressName, setProgressName] = useState(progress.progressName || "");
  const [description, setDescription] = useState(progress.description || "");
  const [newSections, setNewSections] = useState<ProgressSection[]>(
    progress.sections || []
  );
  const [sectionsToDelete, setSectionsToDelete] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddSection = () => {
    setNewSections([
      ...newSections,
      {
        sectionId: "",
        sectionName: `New Section ${newSections.length + 1}`,
        progressValues: [],
      },
    ]);
  };

  const handleRemoveSection = (index: number, sectionId?: string) => {
    if (sectionId) {
      setSectionsToDelete([...sectionsToDelete, sectionId]);
    }
    setNewSections(newSections.filter((_, i) => i !== index));
  };

  const handleUpdateSectionName = (index: number, value: string) => {
    const updatedSections = [...newSections];
    updatedSections[index].sectionName = value;
    setNewSections(updatedSections);
  };

  const handleAddProgressValue = (sectionIndex: number) => {
    const updatedSections = [...newSections];
    updatedSections[sectionIndex].progressValues.push({
      progressColumnValue: "",
      progressDate_Day: 1,
      progressDate_Month: 1,
      progressDate_Year: 2024,
    });
    setNewSections(updatedSections);
  };

  const handleRemoveProgressValue = (
    sectionIndex: number,
    valueIndex: number
  ) => {
    const updatedSections = [...newSections];
    updatedSections[sectionIndex].progressValues = updatedSections[
      sectionIndex
    ].progressValues.filter((_, i) => i !== valueIndex);
    setNewSections(updatedSections);
  };

  const handleUpdateProgressValue = (
    sectionIndex: number,
    valueIndex: number,
    field: keyof ProgressValueDTO,
    value: any
  ) => {
    const updatedSections = [...newSections];
    updatedSections[sectionIndex].progressValues[valueIndex] = {
      ...updatedSections[sectionIndex].progressValues[valueIndex],
      [field]: value,
    };
    setNewSections(updatedSections);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      progressName,
      description,
      newSections,
      sectionsToDelete,
    };

    try {
      const response = await apiClient.put(
        `progresses/${progress.id}`,
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        placeholder="Enter description"
      />

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">Sections</h3>
        {newSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Section Name"
                value={section.sectionName}
                onChange={(e) =>
                  handleUpdateSectionName(sectionIndex, e.target.value)
                }
                className="block w-1/2 rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  handleRemoveSection(sectionIndex, section.sectionId)
                }
                className="inline-flex items-center px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800">
                Remove Section
              </button>
            </div>
            {section.progressValues.map((value, valueIndex) => (
              <div
                key={valueIndex}
                className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Column Value"
                  value={value.progressColumnValue}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      sectionIndex,
                      valueIndex,
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
                      sectionIndex,
                      valueIndex,
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
                      sectionIndex,
                      valueIndex,
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
                      sectionIndex,
                      valueIndex,
                      "progressDate_Year",
                      parseInt(e.target.value)
                    )
                  }
                  className="block w-1/6 rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveProgressValue(sectionIndex, valueIndex)
                  }
                  className="inline-flex items-center px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddProgressValue(sectionIndex)}
              className="inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800 mt-2">
              Add Value
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800 mt-2">
          Add Section
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

export default UpdateProgressForm;
