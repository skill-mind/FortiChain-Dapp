"use client";

import { useState } from "react";
import { CloudUpload } from "lucide-react";

export default function SubmitARequest() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size <= 5 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        alert("File size exceeds 5MB limit.");
      }
    }
  };

  const handleSubmit = () => {
    if (!email || !subject || !message) {
      alert("Please fill all the fields.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    if (file) {
      formData.append("file", file);
    }

    // Simulate sending data
    console.log("Form Submitted:", {
      email,
      subject,
      message,
      fileName: file?.name,
    });

    alert("Request Submitted Successfully!");

    // Reset form
    setEmail("");
    setSubject("");
    setMessage("");
    setFile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-[734px] h-auto py-[30px] px-[28px] bg-[#1C1618] rounded-[20px] flex flex-col gap-[34px] border border-[#464043]">
        <h1 className="text-[32px] font-[700] text-white mb-5">
          Submit a Request
        </h1>

        {/* Email */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="Email" className="text-[14px] font-[600]">
            Email
          </label>
          <input
            className="outline-none border border-[#D3D1D2] py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]"
            type="email"
            id="Email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="Subject" className="text-[14px] font-[600]">
            Subject
          </label>
          <input
            className="outline-none border border-[#D3D1D2] py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]"
            type="text"
            id="Subject"
            placeholder="Vulnerability Report"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="Message" className="text-[14px] font-[600]">
            Message
          </label>
          <div className="border border-[#D3D1D2] py-[14px] px-[8px] text-[#B5B3B4] text-[13px] rounded-[8px] font-[500] bg-[#161113]">
            <textarea
              className="outline-none min-h-[165px] w-full bg-transparent"
              id="Message"
              placeholder="Write a message"
              maxLength={256}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end">
              <span className="text-[#B5B3B4] text-[12px] font-[500]">
                {message.length}/256
              </span>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="w-full flex justify-between items-center border border-[#D3D1D2] rounded-[8px] py-[8px] px-[14px] bg-[#161113]">
          <div className="flex gap-3 w-full justify-start items-center">
            <span className="rounded-full p-2 bg-[#464043]">
              <CloudUpload size={30} />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-white text-[16px] font-[600]">
                {file ? file.name : "Upload File"}
              </span>
              <span className="text-white text-[14px] font-[400]">
                PDF format: Max. 5MB
              </span>
            </div>
          </div>
          <div className="flex gap-2 justify-end w-full pr-3">
            <label className="bg-[#0000FF] text-white text-[14px] font-[600] py-[8px] px-[32px] rounded-[8px] cursor-pointer">
              Upload
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#0000FF] text-white text-[14px] font-[600] py-[16px] px-[32px] rounded-[8px]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
