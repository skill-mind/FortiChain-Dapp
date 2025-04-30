import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

type TagInputProps = {
  label?: string;
  options: string[];
  placeholder?: string;
};

export default function TagInput({ label, options, placeholder }: TagInputProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null); // 🔹 Add wrapper ref

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setShowDropdown(false);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true); // 🔹 Show dropdown when typing
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    }
    if (e.key === "Backspace" && !inputValue && selectedTags.length) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
    if (e.key === "Escape") {
      setShowDropdown(false); // 🔹 Close dropdown on Escape
    }
  };

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(option)
  );

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={wrapperRef}> {/* 🔹 Add wrapperRef here */}
      {label && (
        <label className="block text-sm text-gray-300 mb-2">{label}</label>
      )}

      <div
        className="flex flex-wrap items-center gap-2 bg-[#161113] border border-[#6B6668] rounded px-2 py-2 text-white min-h-[48px] relative"
        onClick={() => inputRef.current?.focus()}
      >
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center text-black font-semibold bg-white border border-gray-700 rounded-full px-3 py-1 text-sm"
          >
            {tag}
            <X
              size={14}
              className="ml-1 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </div>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow bg-transparent focus:outline-none text-white min-w-[120px] py-1 px-2"
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && filteredOptions.length > 0 && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-[#161113] border border-[#6B6668] rounded shadow-lg max-h-48 overflow-auto z-20">
            {filteredOptions.map((option, idx) => (
              <li
                key={idx}
                onClick={() => addTag(option)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-700 text-white text-sm"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
