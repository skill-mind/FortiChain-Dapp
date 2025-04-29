"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import {
	modalOverlayVariants,
	modalVariants,
	modalContentVariants,
} from "../../project-owner/reports/animations";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
	const modalContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalContentRef.current &&
				!modalContentRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<motion.div
			variants={modalOverlayVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className="fixed inset-0 bg-[#504F4F0F] bg-opacity-50 backdrop-blur-[3px] flex justify-center items-center p-4 z-50"
		>
			<motion.div
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
				className="bg-[#161113] text-white p-10 rounded-xl w-full max-w-[400px] lg:max-w-[600px] xl:max-w-[750px] border border-[#464043] shadow-lg relative"
				ref={modalContentRef}
			>
				<motion.div
					variants={modalContentVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					{children}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Modal;
