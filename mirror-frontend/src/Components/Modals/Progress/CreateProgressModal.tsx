"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CreateProgressForm from "../../Forms/Progress/CreateProgressForm";

type CreateProgressModalProps = {
  opened?: boolean;
  onClose: () => void;
};

export default function CreateProgressModal({
  opened,
  onClose,
}: CreateProgressModalProps) {
  const [open, setOpen] = useState(opened);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
              <div className="text-center sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900">
                  Create New Progress
                </DialogTitle>
                <CreateProgressForm onClose={handleClose} />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
