"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'code-block'],
  ],
};

const formats = [
  'header', 'font',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'align',
  'link', 'code-block'
];



export default function () {
  const [value, setValue] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#110D0F] text-white p-10">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col w-full rounded-[30px] bg-[#1C1618] border px-[32px] py-[26px] border-[#464043] relative max-w-6xl">
          <h1 className="text-[32px] font-[800] text-white text-center">
            Write a Report
          </h1>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-[14px] font-[600]">
                Report Title
              </label>
              <input
                className="outline-none border py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]"
                type="text"
                name=""
                id="title"
                placeholder="Give your report a title"
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <div className="flex flex-col gap-2 md:w-3/5 w-full">
                <label htmlFor="title" className="text-[14px] font-[600]">
                  Project
                </label>
                <input
                  className="outline-none border py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]"
                  type="text"
                  name=""
                  id="title"
                  placeholder="Give your report a title"
                />
              </div>
             <div className="flex flex-col gap-2 md:w-3/5 w-full">
                <label htmlFor="level" className="text-[14px] font-[600]">
                  Severity Level
                </label>
                <select  name="" id="level" className="outline-none border py-[15px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]">
                <option value="">
                    Choose Severity Level
                  </option>
                  <option value="">
                    Choose Severity Level
                  </option>
                  <option value="">
                    Choose Severity Level
                  </option>
                </select>
             </div>
            </div>
            <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-white">Report Body</h2>
        <button 
          onClick={() => setPreviewMode(!previewMode)}
          className="bg-[#161113] border border-[#464043] text-white text-sm py-2 px-4 rounded-md hover:bg-[#1e1a1c] transition"
        >
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>
<div>

</div>
      <div className="bg-[#161113] p-3 rounded-md">
        {!previewMode ? (
          <div className="
          [&_.ql-toolbar]:bg-[#161113]
          [&_.ql-toolbar]:border-0
          [&_.ql-container]:bg-[#161113]
          [&_.ql-container]:border-0
          [&_.ql-editor]:min-h-[120px]
          [&_.ql-editor]:text-[#B5B3B4]
          [&_.ql-editor.ql-blank::before]:text-[#6B6668]
          [&_.ql-editor.ql-blank::before]:text-[14px]
          [&_.ql-toolbar_button_svg]:fill-[#B5B3B4]
          rounded-md
          border-none
          
        ">
            <ReactQuill 
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Describe Vulnerabilities Found and Suggest a fix"
            />
          </div>
        ) : (
          <div className="p-4 min-h-[120px] bg-[#161113] text-gray-300 rounded-md overflow-y-auto prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: value || "<p>Describe Vulnerabilities Found and Suggest a fix</p>" }} />
          </div>
        )}
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
