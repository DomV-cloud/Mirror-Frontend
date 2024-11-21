import { useState } from "react";
import ModalForm from "./FormModal";
import PlusIcon from "./Icons/PlusIcons";

function AddChartGrid() {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="
          flex 
          items-center 
          justify-center 
          border-4 border-gray-400 
          hover:bg-gray-500 
          w-[128px] 
          h-[128px] 
          cursor-pointer
          rounded-md
        "
        onClick={handleOpenDialog}
      >
        <PlusIcon />
      </div>
      
      {showDialog && <ModalForm opened={showDialog} onClose={handleCloseDialog} />}
    </div>
  );
}

export default AddChartGrid;
