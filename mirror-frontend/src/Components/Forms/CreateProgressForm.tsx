import { useState } from "react";

type CreateProgressFormProps = {
  onClose: () => void;
};

function CreateProgressForm({ onClose }: CreateProgressFormProps) {
  const [progressName, setProgressName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Progress Name:", progressName);
    setProgressName('');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="progressName" className="block text-sm font-medium text-gray-700">
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
      <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateProgressForm;
