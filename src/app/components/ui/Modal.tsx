"use client"

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import IconButton from "./icon-button";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
       <div></div>
    )
}

export default Modal;