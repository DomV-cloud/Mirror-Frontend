import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProgress } from "../../../Api/Client/Endpoints/progressValueApi";

type CreateProgressFormProps = {
  onClose: () => void;
  userId: string;
};

type ProgressValueRequest = {
  ProgressColumnValue: string;
  ProgressDate_Day: number;
  ProgressDate_Month: number;
  ProgressDate_Year: number;
};

type ProgressSectionRequest = {
  SectionName: string;
  ProgressValues: ProgressValueRequest[];
};

function CreateProgressForm({ onClose, userId }: CreateProgressFormProps) {
  const [progressName, setProgressName] = useState("");
  const [sections, setSections] = useState<ProgressSectionRequest[]>([]);
  const [isAchieved, setIsAchieved] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [trackedDays, setTrackedDays] = useState(0);
  const [trackingProgressDays, setTrackingProgressDays] = useState("");
  const [percentageAchieved, setPercentageAchieved] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddSection = () => {
    setSections([...sections, { SectionName: "", ProgressValues: [] }]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleUpdateSectionName = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].SectionName = value;
    setSections(updatedSections);
  };

  const handleAddProgressValue = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].ProgressValues.push({
      ProgressColumnValue: "",
      ProgressDate_Day: 1,
      ProgressDate_Month: 1,
      ProgressDate_Year: new Date().getFullYear(),
    });
    setSections(updatedSections);
  };

  const handleRemoveProgressValue = (
    sectionIndex: number,
    valueIndex: number
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].ProgressValues = updatedSections[
      sectionIndex
    ].ProgressValues.filter((_, i) => i !== valueIndex);
    setSections(updatedSections);
  };

  const handleUpdateProgressValue = (
    sectionIndex: number,
    valueIndex: number,
    field: keyof ProgressValueRequest,
    value: any
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].ProgressValues[valueIndex][field] = value;
    setSections(updatedSections);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("ProgressName", progressName);
    formData.append("UserId", userId);
    formData.append("IsAchieved", isAchieved.toString());
    formData.append("IsActive", isActive.toString());
    formData.append("TrackedDays", trackedDays.toString());
    formData.append("TrackingProgressDays", trackingProgressDays);
    formData.append("PercentageAchieved", percentageAchieved.toString());
    if (image) formData.append("Image", image);

    sections.forEach((section, sectionIndex) => {
      formData.append(
        `Sections[${sectionIndex}].SectionName`,
        section.SectionName
      );
      section.ProgressValues.forEach((value, valueIndex) => {
        formData.append(
          `Sections[${sectionIndex}].ProgressValues[${valueIndex}].ProgressColumnValue`,
          value.ProgressColumnValue || ""
        );
        formData.append(
          `Sections[${sectionIndex}].ProgressValues[${valueIndex}].ProgressDate_Day`,
          value.ProgressDate_Day.toString()
        );
        formData.append(
          `Sections[${sectionIndex}].ProgressValues[${valueIndex}].ProgressDate_Month`,
          value.ProgressDate_Month.toString()
        );
        formData.append(
          `Sections[${sectionIndex}].ProgressValues[${valueIndex}].ProgressDate_Year`,
          value.ProgressDate_Year.toString()
        );
      });
    });

    try {
      const response = await createProgress(formData);

      alert("Progress successfully created!");
      const id = response.data.createdProgressId;

      // Reset formuláře
      setProgressName("");
      setSections([]);
      setIsAchieved(false);
      setIsActive(true);
      setTrackedDays(0);
      setTrackingProgressDays("");
      setPercentageAchieved(0);
      setImage(null);

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
        <h3 className="text-sm font-medium text-gray-700">Sections</h3>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-4">
            <input
              type="text"
              placeholder="Section Name"
              value={section.SectionName}
              onChange={(e) =>
                handleUpdateSectionName(sectionIndex, e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />

            <h4 className="mt-2 text-sm font-medium text-gray-700">
              Progress Values
            </h4>
            {section.ProgressValues.map((value, valueIndex) => (
              <div
                key={valueIndex}
                className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Column Value"
                  value={value.ProgressColumnValue}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      sectionIndex,
                      valueIndex,
                      "ProgressColumnValue",
                      e.target.value
                    )
                  }
                  className="block w-1/3 rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <input
                  type="number"
                  placeholder="Day"
                  value={value.ProgressDate_Day}
                  onChange={(e) =>
                    handleUpdateProgressValue(
                      sectionIndex,
                      valueIndex,
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
                      sectionIndex,
                      valueIndex,
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
                      sectionIndex,
                      valueIndex,
                      "ProgressDate_Year",
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
              className="mt-2 inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
              Add Progress Value
            </button>
            <button
              type="button"
              onClick={() => handleRemoveSection(sectionIndex)}
              className="mt-2 inline-flex items-center px-2 py-1 text-sm font-semibold text-red-600 hover:text-red-800">
              Remove Section
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="mt-4 inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
          Add Section
        </button>
      </div>

      <label className="block text-sm font-medium text-gray-700 mt-4">
        Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 block w-full text-sm text-gray-500"
      />

      <div className="mt-4 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Is Achieved
          </label>
          <input
            type="checkbox"
            checked={isAchieved}
            onChange={(e) => setIsAchieved(e.target.checked)}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Is Active
          </label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="trackedDays"
          className="block text-sm font-medium text-gray-700">
          Tracked Days
        </label>
        <input
          id="trackedDays"
          type="number"
          value={trackedDays}
          onChange={(e) => setTrackedDays(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="trackingProgressDays"
          className="block text-sm font-medium text-gray-700">
          Tracking Progress Days
        </label>
        <input
          id="trackingProgressDays"
          type="text"
          value={trackingProgressDays}
          onChange={(e) => setTrackingProgressDays(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="percentageAchieved"
          className="block text-sm font-medium text-gray-700">
          Percentage Achieved
        </label>
        <input
          id="percentageAchieved"
          type="number"
          value={percentageAchieved}
          onChange={(e) => setPercentageAchieved(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
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
