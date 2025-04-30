import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Check, ChevronDown, CloudUpload, MoveRight, Search, Shield, Upload, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';
import NigerianFlag from "../../../public/Nigeria(NG).svg"
import TagInput from './TagInput';
import CheckIcon from '../../../public/researcherIcon/check.svg';

type Step = 'personal' | 'professional' | 'identity' | 'agreement' | 'complete';

interface KycModalProps {
    buttonText: string;
    buttonIcon?: ReactNode;
    className?: string;
}

export default function KYCModal({  buttonText, buttonIcon, className }: KycModalProps) {
    const [showModal, setShowModal] = useState(false);

    // KYC Modal internal state
    const [currentStep, setCurrentStep] = useState<Step>('personal');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [country, setCountry] = useState<string>('');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [documentType, setDocumentType] = useState<string>('');
    const [showDocTypeDropdown, setShowDocTypeDropdown] = useState(false);
    const [yearsExperience, setYearsExperience] = useState<string>('');

    const countries = ['Nigeria', 'France', 'South Africa', 'China', 'Japan'];
    const documentTypes = ["Driver's License", "Voter's Card", "National Identity Number"];
    const techOptions = ['Security', 'DeFi', 'Cloud', 'NFTs', 'Storage'];
    const programmingLanguages = ["Rust", "Cairo", "Solidity", "Python", "JavaScript", "TypeScript"];

    const openModal = () => {
        setCurrentStep('personal');
        setShowModal(true);
    };

    const nextStep = () => {
        if (currentStep === 'personal') setCurrentStep('professional');
        else if (currentStep === 'professional') setCurrentStep('identity');
        else if (currentStep === 'identity') setCurrentStep('agreement');
        else if (currentStep === 'agreement') setCurrentStep('complete');
    };

    const prevStep = () => {
        if (currentStep === 'professional') setCurrentStep('personal');
        else if (currentStep === 'identity') setCurrentStep('professional');
        else if (currentStep === 'agreement') setCurrentStep('identity');
    };

    function StepIndicatorComponent({ indicatorStep, indicatorLabel, indicatorNumber }: { indicatorStep: Step, indicatorLabel: string, indicatorNumber: number }) {
        return (
            <div className={`flex items-center justify-around p-2 border rounded-full text-gray-400 ${currentStep < indicatorStep ? ' border-blue-900 text-white' : 'border-gray-700 text-gray-400'}`}>
                <div className={`flex items-center justify-center text-[10px] w-4 h-4 rounded-full ${currentStep === indicatorStep ? 'border border-blue-900 text-white' : 'border border-gray-700 text-gray-400'}`}>
                    {indicatorNumber}
                </div>
                <p className='px-3 text-[10px]'>{indicatorLabel}</p>
            </div>
        )
    }

    const renderStepIndicator = () => {
        return (
            <div className="flex items-center justify-center w-full mb-6">
                <StepIndicatorComponent indicatorNumber={1} indicatorLabel='Personal Information' indicatorStep='personal' />
                <div className={`h-1 w-6 ${currentStep === 'personal' || currentStep === 'professional' ? 'bg-gray-700' : 'bg-blue-600'}`}></div>
                <StepIndicatorComponent indicatorNumber={2} indicatorLabel='Professional Background' indicatorStep='professional' />
                <div className={`h-1 w-6 ${currentStep === 'personal' || currentStep === 'professional' ? 'bg-gray-700' : 'bg-blue-600'}`}></div>
                <StepIndicatorComponent indicatorNumber={3} indicatorLabel='Identity Verification' indicatorStep='identity' />
                <div className={`h-1 w-6 ${currentStep === 'personal' || currentStep === 'professional' ? 'bg-gray-700' : 'bg-blue-600'}`}></div>
                <StepIndicatorComponent indicatorNumber={4} indicatorLabel='Agreement & Compliance' indicatorStep='agreement' />
            </div>
        );
    };

    function NextButton() {
        return (
            <button
                onClick={nextStep}
                className="bg-[#0000FF] text-white rounded px-6 py-2 flex items-center justify-center gap-3 w-[180px] hover:bg-blue-700 transition-colors"
            >
                Next <MoveRight size={18} className="ml-1" />
            </button>
        )
    }

    function BackButton() {
        return (
            <button
                onClick={prevStep}
                className="border bg-transparent border-[#0000FF] text-white rounded px-6 py-2 flex items-center justify-center gap-3 w-[180px] transition-colors"
            >
                Back
            </button>
        )
    }

    const renderPersonalInfo = () => {
        return (
            <div className='w-full max-w-[900px]'>
                <h2 className="text-2xl font-semibold text-white text-center mb-8">Personal Information</h2>
                {renderStepIndicator()}

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Full Name (as it appears on official documents)</label>
                        <input
                            type="text"
                            className="w-full bg-[#161113] border border-borderGray rounded px-4 py-3 text-white"
                            defaultValue="Aisha Murtala"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Date of Birth */}
                        <div className="relative w-full">
                            <label className="block text-sm text-gray-300 mb-2">Date of Birth</label>
                            <div className="relative bg-[#161113] border border-borderGray rounded">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    placeholderText="Select Date"
                                    className="w-full bg-[#161113] pl-11 px-4 py-[13px] text-white focus:outline-none"
                                />
                                {/* Calendar Icon */}
                                <CalendarDays
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                    size={20}
                                />
                            </div>
                        </div>

                        {/* Nationality */}
                        <div className="relative">
                            <label className="block text-sm text-gray-300 mb-2">Nationality</label>
                            <div className="relative">
                                <select className="w-full bg-[#161113] border border-borderGray rounded px-4 py-3 text-white appearance-none pr-10">
                                    <option value="">Select</option>
                                    <option value="nigeria">Nigeria</option>
                                    <option value="france">France</option>
                                    <option value="south-africa">South Africa</option>
                                </select>
                                {/* Chevron Down Icon */}
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-[#161113] border border-[#6B6668] rounded px-4 py-3 text-white"
                                placeholder="example@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                            <div className="flex gap-2">
                                <div className="flex items-center justify-center w-[89px] bg-[#161113] border border-borderGray gap-2 rounded-lg">
                                    <Image src={NigerianFlag} alt="Flag" className="mr-1" />
                                    <ChevronDown />
                                </div>
                                <div className="relative w-full">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-sm">
                                        +234
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full bg-[#161113] border border-borderGray rounded px-14 py-3 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <NextButton />
                </div>
            </div>
        );
    };

    const renderProfessionalBackground = () => {

        return (
            <div>
                <h2 className="text-2xl font-semibold text-white text-center mb-8">Professional Background</h2>
                {renderStepIndicator()}

                <div className="space-y-6">
                    <TagInput options={programmingLanguages} label='Programming Language Proficiency' />
                    <TagInput options={techOptions} label='Technical Expertise' />

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Years of Experience</label>
                        <select
                            className="w-full bg-[#161113] border border-borderGray rounded px-4 py-3 text-white appearance-none"
                            value={yearsExperience}
                            onChange={(e) => setYearsExperience(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Website/Portfolio</label>
                        <input
                            type="text"
                            className="w-full bg-[#161113] border border-borderGray rounded text-[12px] px-4 py-3 text-white"
                            placeholder="URL website"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">GitHub Profile URL</label>
                        <input
                            type="text"
                            className="w-full bg-[#161113] border border-[#6B6668] rounded text-[12px] px-4 py-3 text-white"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">LinkedIn Profile URL</label>
                        <input
                            type="text"
                            className="w-full bg-[#161113] border border-[#6B6668] rounded text-[12px] px-4 py-3 text-white"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Resume/CV Upload:</label>
                        <div className="flex items-center flex-wrap md:flex-nowrap border rounded-lg border-borderGray">
                            <div className="w-full md:flex-grow flex items-center rounded-l px-4 py-1 text-gray-400 gap-3">
                                <div className='w-[48px] h-[48px] bg-[#464043] rounded-full flex items-center justify-center'>
                                    <CloudUpload color='#CCCCFF' size={21} className="flex-shrink-0" />
                                </div>
                                <div className="flex justify-start flex-col">
                                    <span className="truncate text-[14px]">Upload your document</span>
                                    <span className="text-xs hidden sm:inline">PDF, Docx • Max. 3MB</span>
                                </div>
                            </div>
                            <button className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors">Upload</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Certifications (Optional)</label>
                        <div className="flex items-center flex-wrap md:flex-nowrap border rounded-lg border-borderGray">
                            <div className="w-full md:flex-grow flex items-center rounded-l px-4 py-1 gap-3 text-gray-400">
                                <div className='w-[48px] h-[48px] bg-[#464043] rounded-full flex items-center justify-center'>
                                    <CloudUpload color='#CCCCFF' size={21} className="flex-shrink-0" />
                                </div>
                                <div className="flex justify-start flex-col">
                                    <span className="truncate text-[14px]">Upload your document</span>
                                    <span className="text-xs hidden sm:inline">600px by 600px (PNG, JPG) • Max. 3MB</span>
                                </div>
                            </div>
                            <button className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors">Upload</button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-10">
                    <BackButton />
                    <NextButton />
                </div>
            </div>
        );
    };


    const renderIdentityVerification = () => {
        return (
            <div className='w-full max-w-[90%] mx-auto'>
                <h2 className="text-2xl text-center font-bold text-white mb-8">Identity Verification</h2>
                {renderStepIndicator()}

                <div className="mt-14 mb-6">
                    <h2 className="text-[24px] font-bold text-white mb-4">Upload a proof of your identity</h2>
                    <hr className="border-t border-borderGray mb-10" />

                    <div className="flex justify-between gap-1 mb-6">
                        <div className='w-full max-w-[350px]'>
                            <label className="block text-sm text-white font-bold mb-2">Country</label>
                            <div className="relative w-full max-w-[350px] h-[60]">
                                <div
                                    className="flex justify-between items-center w-full bg-[#161113] border border-borderGray rounded px-4 py-3 text-[#B5B3B4] cursor-pointer"
                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                >
                                    <span>{country || 'Select Country'}</span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>

                                {showCountryDropdown && (
                                    <div className="absolute top-full left-0 w-full bg-[#0B090A] border border-gray-700 rounded mt-1 z-10 max-h-48 overflow-y-auto">
                                        <div className="p-2">
                                            <div className="flex items-center rounded px-3 py-2 mb-2">
                                                <Search size={16} className="text-gray-400 mr-2" />
                                                <input
                                                    type="text"
                                                    className="bg-[#0B090A] flex-grow text-white outline-none"
                                                    placeholder="Search"
                                                />
                                            </div>

                                            <hr className="border-t border-borderGray mb-2" />

                                            {countries.map((c, index) => (
                                                <div
                                                    key={index}
                                                    className="px-3 py-2 text-white hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                                                    onClick={() => {
                                                        setCountry(c);
                                                        setShowCountryDropdown(false);
                                                    }}
                                                >
                                                    {c}
                                                    {country === c && <Check size={16} />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='w-full max-w-[350px]'>
                            <label className="block text-sm text-white font-bold mb-2">Document Type</label>
                            <div className="relative max-w-[350px] h-[60]">
                                <div
                                    className="flex justify-between items-center w-full bg-[#161113] border border-borderGray rounded px-4 py-3 text-[#B5B3B4] cursor-pointer"
                                    onClick={() => setShowDocTypeDropdown(!showDocTypeDropdown)}
                                >
                                    <span>{documentType || 'Select a document type'}</span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>

                                {showDocTypeDropdown && (
                                    <div className="absolute top-full left-0 w-full bg-[#0B090A] border-gray-700 rounded mt-1 z-10 max-h-48 overflow-y-auto">
                                        {documentTypes.map((type, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                                                onClick={() => {
                                                    setDocumentType(type);
                                                    setShowDocTypeDropdown(false);
                                                }}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between gap-4">
                        <div>
                            <div className="bg-[#110D0F] max-w-[350px] h-[207px] border border-[#464043] rounded p-6 flex flex-col items-center justify-center text-center">
                                <Upload size={24} className="text-white mb-2" />
                                <h4 className="text-white mb-1">Front side of your document</h4>
                                <p className="text-[#908C8E] text-sm mb-4">Upload the front side of your document (PDF, PNG, JPG)</p>
                                <button className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors">Choose File</button>
                            </div>
                        </div>

                        <div>
                            <div className="bg-[#110D0F] max-w-[350px] h-[207px] border border-[#464043] rounded p-6 flex flex-col items-center justify-center text-center">
                                <Upload size={24} className="text-white mb-2" />
                                <h4 className="text-white mb-1">Back side of your document</h4>
                                <p className="text-[#908C8E] text-sm mb-4">Upload the back side of your document (PDF, PNG, JPG)</p>
                                <button className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors">Choose File</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-12">
                    <BackButton />
                    <NextButton />
                </div>
            </div>
        );
    };

    const renderAgreementCompliance = () => {
        return (
            <div>
                <h2 className="text-2xl text-center font-bold text-white mb-8">Agreement & Compliance</h2>
                {renderStepIndicator()}

                <div className="space-y-6 w-[85%] mx-auto">
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-sm bg-[#0000FF] flex items-center justify-center mr-3">
                            <Check size={16} className="text-white" />
                        </div>
                        <span className="text-white">I agree to the Non-Disclosure Agreement</span>
                    </div>

                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-sm bg-[#0000FF] flex items-center justify-center mr-3">
                            <Check size={16} className="text-white" />
                        </div>
                        <span className="text-white">I agree to the Code of Conduct</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-10">
                    <BackButton />
                    <NextButton />
                </div>
            </div>
        );
    };

    const renderComplete = () => {
        return (
            <div className="text-center w-full py-8">
                <h2 className="text-2xl font-semibold text-white mb-4">KYC Submission Complete!</h2>

                <p className="text-gray-300 mb-1">
                    Your KYC submission has been received<br />
                    Our team is reviewing your information.
                </p>

                <hr className="border-t border-[#464043] mb-4" />

                <div className="flex justify-center mb-8 mt-12">
                    <Image src={CheckIcon} alt="Check Icon" />
                </div>

                <p className="text-gray-300 mb-6">
                    Expected approval time: 24-48 hours.<br />
                    Need help? Contact support.
                </p>

                <button
                    onClick={() => setShowModal(false)}
                    className="bg-[#0000FF] text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors"
                >
                    Return to dashboard
                </button>
            </div>
        );
    };

    // Scrollbar styles
    const scrollbarStyles = `
    /* For Webkit browsers (Chrome, Safari) */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(31, 41, 55, 0.5);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: rgba(55, 65, 81, 0.8);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(59, 130, 246, 0.7);
    }
    
    /* For Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: rgba(55, 65, 81, 0.8) rgba(31, 41, 55, 0.5);
    }
  `;

    // Render content based on current step
    let content;
    switch (currentStep) {
        case 'personal':
            content = renderPersonalInfo();
            break;
        case 'professional':
            content = renderProfessionalBackground();
            break;
        case 'identity':
            content = renderIdentityVerification();
            break;
        case 'agreement':
            content = renderAgreementCompliance();
            break;
        case 'complete':
            content = renderComplete();
            break;
        default:
            content = renderPersonalInfo();
    }

    return (
        <div className="relative">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <button
                    onClick={openModal}
                    className={`min-w-[${className ? "" : "144px"}] h-[36px] flex justify-center gap-1 items-center bg-[#0000FF] text-[14px] rounded-lg ${className} transition-colors duration-200 hover:bg-[#1a1aff]`}
                >
                    {buttonText} {buttonIcon}
                </button>
            </motion.div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#1C1618] bg-opacity-75 z-50 overflow-y-auto p-4">
                    <style>{scrollbarStyles}</style>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`bg-[#1C1618] rounded-lg border border-[#464043] ${currentStep === "complete" ? "h-[481px] w-[538px]" : "w-full max-w-[910px]"} shadow-xl my-8`}
                    >
                        <div className="p-3 md:p-3 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-end items-center mb-4">
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-200">
                                    <X size={24} />
                                </button>
                            </div>
                            {content}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}