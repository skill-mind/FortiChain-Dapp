"use client";

import React, { useState, useRef, useEffect } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().nonempty("Message is required"),
  document: z
    .any()
    .refine((files: FileList) => {
      if (!files?.length) return true; // optional
      return files[0].size <= MAX_FILE_SIZE;
    }, "File must be ≤ 5 MB")
    .refine((files: FileList) => {
      if (!files?.length) return true;
      return ACCEPTED_FILE_TYPES.includes(files[0].type);
    }, "Unsupported file type"),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // data.document is a FileList; access via data.document[0]
    console.log(data);
  };

  // Custom dropdown state & refs
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = [
    { label: "General Inquiry", value: "general" },
    { label: "Support", value: "support" },
    { label: "Feedback", value: "feedback" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="border border-[#464043] rounded-[20px] bg-[#1C1618]">
      <div className="w-full p-[30px]">
        <h2 className="mb-6 text-4xl font-semibold">Submit a Request</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          {/* Email */}
          <div>
            <label className="block mb-1 text-[14px] font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email Address"
              {...register("email")}
              className="w-full placeholder:text-[#B5B3B4] border text-[13px] placeholder:text-[13px] !border-[#d3d1d2] px-[8px] py-[20px] bg-[#161113] rounded-[8px] text-white"
            />
            {errors.email && (
              <p className="mt-1 text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Subject (div-based dropdown) */}
          <div ref={ref}>
            <label className="block mb-1 text-[14px] font-semibold">
              Subject
            </label>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <div className="relative text-[13px]">
                  <div
                    className="border !border-[#d3d1d2] bg-[#161113] rounded-[8px] px-[8px] py-[20px] cursor-pointer flex justify-between items-center w-full"
                    onClick={() => setOpen(!open)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                  >
                    <span
                      className={`${
                        field.value ? "text-white" : "text-[#B5B3B4]"
                      }`}
                    >
                      {options.find((o) => o.value === field.value)?.label ||
                        "Select a subject"}
                    </span>

                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        open ? "rotate-180" : ""}`}
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8307 1.5L6.9974 6.5L1.16406 1.5"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {open && (
                    <div
                      role="listbox"
                      className="absolute z-10 mt-1 w-full bg-white rounded border shadow"
                    >
                      {options.map((opt) => (
                        <div
                          key={opt.value}
                          role="option"
                          className="px-3 py-2 text-black cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
            {errors.subject && (
              <p className="mt-1 text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* message */}
          <div>
            <label className="block mb-1 text-[14px] font-semibold">
              Message
            </label>
            <textarea
              {...register("message")}
              placeholder="Write a Message"
              className="w-full min-h-[165px] text-[13px] border px-[8px] py-[14px] bg-[#161113] !border-[#d3d1d2]  rounded-[8px] text-white"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* Document Upload */}
          <div>
            <label className="block mb-1 text-[14px] font-semibold">
              Support Document
            </label>
            <div className="bg-[#161113] rounded-[8px] border !border-[#d3d1d2] py-[15px] px-[10px] flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center bg-[#464043] h-[50px] w-[50px] rounded-full shrink-0">
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7.5C5 4.46243 7.46243 2 10.5 2C13.1907 2 15.432 3.93318 15.907 6.48668C15.9736 6.84475 16.2297 7.1383 16.5754 7.25295C18.5661 7.9132 20 9.79045 20 12C20 14.7614 17.7614 17 15 17C14.4477 17 14 17.4477 14 18C14 18.5523 14.4477 19 15 19C18.866 19 22 15.866 22 12C22 9.10754 20.2462 6.62697 17.7463 5.55958C16.8909 2.358 13.9717 0 10.5 0C6.35786 0 3 3.35786 3 7.5C3 7.60028 3.00197 7.70014 3.00589 7.79955C1.21048 8.8354 0 10.7754 0 13C0 16.3137 2.68629 19 6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17C3.79086 17 2 15.2091 2 13C2 11.3427 3.00818 9.91848 4.44865 9.31168C4.86549 9.13609 5.11256 8.70256 5.05119 8.25443C5.01748 8.00826 5 7.75644 5 7.5Z"
                      fill="#CCCCFF"
                    />
                    <path
                      d="M10.3356 12.2526C10.7145 11.9158 11.2855 11.9158 11.6644 12.2526L13.1644 13.5859C13.5771 13.9528 13.6143 14.5849 13.2474 14.9977C12.9264 15.3588 12.4025 15.4325 12 15.1996V20C12 20.5523 11.5523 21 11 21C10.4477 21 10 20.5523 10 20V15.1996C9.5975 15.4325 9.07358 15.3588 8.75259 14.9977C8.38567 14.5849 8.42285 13.9528 8.83564 13.5859L10.3356 12.2526Z"
                      fill="#CCCCFF"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className="text-[16px] text-[#B5B3B4] font-semibold">
                    Upload your document
                  </p>
                  <div className="flex gap-2 items-center text-sm text-[#98A2B3]">
                    <span>PDF format </span>
                    <svg
                      width="4"
                      height="5"
                      viewBox="0 0 4 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2.5" r="2" fill="#98A2B3" />
                    </svg>
                    <span>Max. 5MB</span>
                  </div>
                </div>
              </div>
              <div className="upload-btn px-4 py-2 relative bg-[#0000FF] rounded-lg w-full max-w-[160px] text-center text-sm">
                Upload
                <input
                  type="file"
                  {...register("document")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            {errors.document && (
              <p className="mt-1 text-red-600">{errors?.document?.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center  w-full max-w-[182px] py-[16px] text-white bg-[#0000FF] rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <div>{isSubmitting ? "Submitting…" : "Submit"}</div>
          </button>
        </form>
      </div>
    </div>
  );
}
