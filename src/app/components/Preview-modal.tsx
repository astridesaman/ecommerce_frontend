"use client";

import usePreviewModal from "../hooks/use-preview-modal";
import Modal from "./ui/Modal";

const PreviewModal = () => {
    const previewModal = usePreviewModal();

    return (
        <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
            <div className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                  
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
               
                </div>
            </div>
        </Modal>
    )
}

export default PreviewModal;