"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

interface Props {
	selectedLanguages: string[];
	allLanguages: string[];
	onSelectChange: (language: string) => void;
}

const LanguageDropdown: React.FC<Props> = ({ selectedLanguages, allLanguages, onSelectChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const filteredLanguages = useMemo(() => {
		return allLanguages.filter((language) =>
			language.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [allLanguages, searchQuery]);

	const getButtonLabel = () => {
		if (selectedLanguages.length === 0) {
			return "Select Languages";
		} else if (selectedLanguages.length === 1) {
			return selectedLanguages[0];
		} else {
			return `${selectedLanguages.length} Selected`;
		}
	};

	const renderCheckmark = (isSelected: boolean) => (
		<Check
			className={`w-5 h-5 text-white ml-2 ${isSelected ? "opacity-100" : "opacity-0"}`}
		/>
	);

	return (
		<div className="" ref={dropdownRef}>
			<button
				className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#161113] border border-[#464043] text-[13px] focus:outline-none focus:border-gray-500 min-w-[150px]"
				onClick={() => setIsOpen(!isOpen)}
			>
				{getButtonLabel()}
				<ChevronDown
					className={`w-5 h-5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>
			{isOpen && (
				<div className="absolute z-10 mt-2 w-48 rounded-[10px] shadow-lg bg-[#0B090A] border border-[#464043]   max-h-60 overflow-y-auto">
					<div className="relative border-b border-[#464043] bg-[#0B090A] p-1">
						<Search className="w-5 h-5 text-white absolute left-2 top-2" />

						<input
							type="text"
							placeholder="Search language..."
							className="w-full px-7 pl-8 py-1 text-sm text-white bg-transparent rounded focus:outline-none focus:tranparent placeholder:text-white"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
					<ul className="">
						{filteredLanguages.map((language) => (
							<li
								key={language}
								className="flex items-center justify-between px-3 py-2 text-sm text-white hover:bg-[#2c2c2cb4] cursor-pointer"
								onClick={() => onSelectChange(language)}
							>
								<span>{language}</span>
								{renderCheckmark(selectedLanguages.includes(language))}
							</li>
						))}
						{filteredLanguages.length === 0 && (
							<li className="px-2 py-1 text-sm text-gray-400">No results</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default LanguageDropdown;
