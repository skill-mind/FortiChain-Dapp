"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the editor with SSR disabled
const TiptapEditor = dynamic(
  () => import("./rich-text-editor").then((mod) => ({ default: mod.TiptapEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col">
        <div className="p-4 border-[1px] rounded-[4px] rounded-b-none border-[#1F1F1F]">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-3">
            <div className="text-[#6C6C6C] text-sm">Loading editor...</div>
          </div>
        </div>
        <div className="flex-1 border-[1px] rounded-[4px] rounded-t-none border-[#1F1F1F] p-6 min-h-[500px]">
          <div className="text-[#6C6C6C]">Loading...</div>
        </div>
      </div>
    ),
  }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  return <TiptapEditor {...props} />;
};
