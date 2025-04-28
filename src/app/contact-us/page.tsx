"use client";
import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const supportSubjects = ["Inheritance Plan", "Claims"] as const;

type SupportSubject = (typeof supportSubjects)[number];

function ContactUs() {
  const maxWords = 256;
  const [wordCount, setWordCount] = useState(0);
  const [turn, setTurn] = useState(false);

  // Animation refs
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    supportingDocument: null as File | null,
  });

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;
    const words = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (words.length <= maxWords) {
      setFormData((prev) => ({ ...prev, message: inputText }));
      setWordCount(words.length);
    } else {
      const truncatedText = words.slice(0, maxWords).join(" ");
      setFormData((prev) => ({ ...prev, message: truncatedText }));
      setWordCount(maxWords);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formSubmissionData = new FormData();
    formSubmissionData.append("email", formData.email);
    formSubmissionData.append("subject", formData.subject);
    formSubmissionData.append("message", formData.message);

    if (formData.supportingDocument) {
      formSubmissionData.append(
        "supportingDocument",
        formData.supportingDocument
      );
    }

    try {
      const response = await fetch("/api/support-ticket", {
        method: "POST",
        body: formSubmissionData,
      });

      if (response.ok) {
        alert("Support ticket submitted successfully!");
        setFormData({
          email: "",
          subject: "",
          message: "",
          supportingDocument: null,
        });
        setWordCount(0);
      } else {
        alert("Failed to submit support ticket. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf"];
      const maxSize = 5 * 1024 * 1024;

      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setFormData((prev) => ({
          ...prev,
          supportingDocument: file,
        }));
      } else {
        alert("Please upload a PDF file not exceeding 5MB");
        e.target.value = "";
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  
  return ( 
    <>
      <div className='bg-[url("/Hero.svg")] bg-no-repeat'>
        <Navbar />
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-white flex items-center justify-center my-6 p-4"
        >
          <div className="w-full max-w-md">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-4"
            >
              We're here to help
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-400 mb-8"
            >
              Need help with your account? Submit a support ticket, and our team
              will assist you within 48 business hours.
            </motion.p>
          </div>
        </motion.div>
        <div className="min-h-screen bg-black text-white flex items-center justify-center my-6 p-4">
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="w-full max-w-md"
          >
            <motion.h2
              variants={itemVariants}
              className="py-2 font-semibold text-2xl mb-2"
            >
              Submit a Request
            </motion.h2>
            <motion.form
              variants={containerVariants}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <label className="py-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: "#0000FF" }}
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Your Email Address"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative"
                onClick={() => setTurn(!turn)}
              >
                <label className="py-2">Subject</label>
                <motion.select
                  whileFocus={{ scale: 1.01, borderColor: "#0000FF" }}
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                >
                  <option value="">Account</option>
                  {supportSubjects.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                      className="bg-black text-white"
                    >
                      {subject}
                    </option>
                  ))}
                </motion.select>
                <motion.span
                  animate={{ rotate: turn ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-11 right-0 mr-2"
                >
                  <Image
                    src="/Vector.svg"
                    alt="vector symbol"
                    width={15}
                    height={15}
                    className="z-10"
                  />
                </motion.span>
              </motion.div>

              <motion.div variants={itemVariants} className="relative mb-2">
                <label className="py-2">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.01, borderColor: "#0000FF" }}
                  value={formData.message}
                  onChange={handleMessageChange}
                  placeholder="Write a Message"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 min-h-[120px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
                <p className="text-gray-400 py-1 px-2 text-xs absolute top-28 right-0">
                  {wordCount}/{maxWords}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label>Supporting Document</label>
                <div className="bg-neutral-900 border border-neutral-700 rounded py-3 px-2 flex items-center">
                  <div className="flex-grow flex items-center">
                    <Image
                      src="/file-upload.svg"
                      alt="upload symbol"
                      width={40}
                      height={40}
                      className="z-10"
                    />
                    <span className="text-gray-400 px-2 text-sm">
                      {formData.supportingDocument
                        ? formData.supportingDocument.name
                        : "Upload your document"}
                      <p className="text-gray-400 py-1 text-xs">
                        PDF format . Max. 5MB
                      </p>
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#0000CC" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0000FF] text-white px-6 py-2 rounded cursor-pointer transition duration-300"
                  >
                    Upload
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </motion.button>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, backgroundColor: "#0000CC" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#0000FF] text-white px-6 py-2 my-6 rounded cursor-pointer transition duration-300 w-full"
              >
                Submit
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
