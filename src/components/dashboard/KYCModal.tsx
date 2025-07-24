import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Check, ChevronDown, CloudUpload, MoveRight, Search, Shield, Upload, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';
import NigerianFlag from "../../../public/Nigeria(NG).svg"
import TagInput from './TagInput';
import CheckIcon from '../../../public/researcherIcon/check.svg';
import { FORTICHAIN_CONTRACT_ADDRESS, uploadImageToPinata, uploadJSONToPinata } from "@/hooks/useBlockchain";
import { useAccount } from "@starknet-react/core";
import { byteArray, CallData } from "starknet";
import { myProvider } from "@/lib/utils";

type Step = 'personal' | 'professional' | 'identity' | 'agreement' | 'complete';

interface KycModalProps {
    buttonText: string;
    buttonIcon?: ReactNode;
    className?: string;
}

interface KYCData {
    fullName: string;
    dateOfBirth: Date | null;
    nationality: string;
    email: string;
    phoneNumber: string;
    programmingLanguages: string[];
    technicalExpertise: string[];
    yearsExperience: string;
    website: string;
    githubUrl: string;
    linkedinUrl: string;
    resumeFile: File | null;
    certificationsFile: File | null;
    country: string;
    documentType: string;
    frontDocument: File | null;
    backDocument: File | null;
    ndaAgreement: boolean;
    codeOfConduct: boolean;
}

interface ValidationErrors {
    [key: string]: string;
}

export default function KYCModal({  buttonText, buttonIcon, className }: KycModalProps) {
    const [showModal, setShowModal] = useState(false);
    const { account } = useAccount();

    // KYC Modal internal state
    const [currentStep, setCurrentStep] = useState<Step>('personal');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showDocTypeDropdown, setShowDocTypeDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    
    // Form data storage
    const [kycData, setKycData] = useState<KYCData>({
        fullName: '',
        dateOfBirth: null,
        nationality: '',
        email: '',
        phoneNumber: '',
        programmingLanguages: [],
        technicalExpertise: [],
        yearsExperience: '',
        website: '',
        githubUrl: '',
        linkedinUrl: '',
        resumeFile: null,
        certificationsFile: null,
        country: '',
        documentType: '',
        frontDocument: null,
        backDocument: null,
        ndaAgreement: false,
        codeOfConduct: false,
    });
    
    // Validation errors
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const countries = [
        'United States',
        'China',
        'Singapore',
        'Switzerland',
        'Germany',
        'Canada',
        'United Kingdom',
        'India',
        'South Korea',
        'Israel',
        'United Arab Emirates',
        'France',
        'Australia',
        'Japan',
        'Netherlands',
        'Nigeria'
    ];
    const documentTypes = ["Driver's License", "Voter's Card", "National Identity Number", "International Passport"];
    const techOptions = ['Security', 'DeFi', 'Cloud', 'NFTs', 'Storage'];
    const programmingLanguages = ["Rust", "Cairo", "Solidity", "Python", "JavaScript", "TypeScript"];

    const openModal = () => {
        if (!account) {
            alert('Please connect your wallet first');
            return;
        }
        
        setCurrentStep('personal');
        setShowModal(true);
        setKycData({
            fullName: '',
            dateOfBirth: null,
            nationality: '',
            email: '',
            phoneNumber: '',
            programmingLanguages: [],
            technicalExpertise: [],
            yearsExperience: '',
            website: '',
            githubUrl: '',
            linkedinUrl: '',
            resumeFile: null,
            certificationsFile: null,
            country: '',
            documentType: '',
            frontDocument: null,
            backDocument: null,
            ndaAgreement: false,
            codeOfConduct: false,
        });
        setValidationErrors({});
        setSubmissionError(null);
    };

    // Update KYC data
    const updateKycData = (field: keyof KYCData, value: any) => {
        setKycData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear validation error for this field
        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    // Validation functions
    const validatePersonalInfo = (): boolean => {
        const errors: ValidationErrors = {};
        
        if (!kycData.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }
        
        if (!kycData.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }
        
        if (!kycData.nationality) {
            errors.nationality = 'Nationality is required';
        }
        
        if (!kycData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kycData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!kycData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateProfessionalBackground = (): boolean => {
        const errors: ValidationErrors = {};
        
        if (kycData.programmingLanguages.length === 0) {
            errors.programmingLanguages = 'At least one programming language is required';
        }
        
        if (kycData.technicalExpertise.length === 0) {
            errors.technicalExpertise = 'At least one technical expertise is required';
        }
        
        if (!kycData.yearsExperience) {
            errors.yearsExperience = 'Years of experience is required';
        }
        
        if (!kycData.githubUrl.trim()) {
            errors.githubUrl = 'GitHub URL is required';
        } else if (!/^https?:\/\/github\.com\/.+/.test(kycData.githubUrl)) {
            errors.githubUrl = 'Please enter a valid GitHub URL';
        }
        
        if (!kycData.resumeFile) {
            errors.resumeFile = 'Resume/CV upload is required';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateIdentityVerification = (): boolean => {
        const errors: ValidationErrors = {};
        
        if (!kycData.country) {
            errors.country = 'Country is required';
        }
        
        if (!kycData.documentType) {
            errors.documentType = 'Document type is required';
        }
        
        if (!kycData.frontDocument) {
            errors.frontDocument = 'Front document upload is required';
        }
        
        if (!kycData.backDocument) {
            errors.backDocument = 'Back document upload is required';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateAgreementCompliance = (): boolean => {
        const errors: ValidationErrors = {};
        
        if (!kycData.ndaAgreement) {
            errors.ndaAgreement = 'You must agree to the Non-Disclosure Agreement';
        }
        
        if (!kycData.codeOfConduct) {
            errors.codeOfConduct = 'You must agree to the Code of Conduct';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submitKYCToContract = async () => {
        if (!account) {
            setSubmissionError('No wallet connected');
            return;
        }

        setIsSubmitting(true);
        setSubmissionError(null);

        try {
            // Upload files to IPFS first
            const uploadPromises = [];
            const fileTypes = [];
            
            if (kycData.resumeFile) {
                uploadPromises.push(uploadImageToPinata(kycData.resumeFile));
                fileTypes.push('resume');
            }
            
            if (kycData.certificationsFile) {
                uploadPromises.push(uploadImageToPinata(kycData.certificationsFile));
                fileTypes.push('certifications');
            }
            
            if (kycData.frontDocument) {
                uploadPromises.push(uploadImageToPinata(kycData.frontDocument));
                fileTypes.push('frontDocument');
            }
            
            if (kycData.backDocument) {
                uploadPromises.push(uploadImageToPinata(kycData.backDocument));
                fileTypes.push('backDocument');
            }

            // Wait for all file uploads to complete
            const uploadResults = await Promise.all(uploadPromises);
            
            // Create a map of file types to their hashes
            const fileHashes: { [key: string]: string } = {};
            fileTypes.forEach((type, index) => {
                fileHashes[type] = uploadResults[index];
            });

            // Prepare the KYC data for JSON upload
            const kycJSONData = {
                // Personal Information
                fullName: kycData.fullName,
                dateOfBirth: kycData.dateOfBirth?.toISOString(),
                nationality: kycData.nationality,
                email: kycData.email,
                phoneNumber: kycData.phoneNumber,
                
                // Professional Background
                programmingLanguages: kycData.programmingLanguages,
                technicalExpertise: kycData.technicalExpertise,
                yearsExperience: kycData.yearsExperience,
                website: kycData.website,
                githubUrl: kycData.githubUrl,
                linkedinUrl: kycData.linkedinUrl,
                resumeFile: fileHashes.resume || null,
                certificationsFile: fileHashes.certifications || null,
                
                // Identity Verification
                country: kycData.country,
                documentType: kycData.documentType,
                frontDocument: fileHashes.frontDocument || null,
                backDocument: fileHashes.backDocument || null,
                
                // Agreement & Compliance
                ndaAgreement: kycData.ndaAgreement,
                codeOfConduct: kycData.codeOfConduct,
                
                // Metadata
                submittedAt: new Date().toISOString(),
                validatorAddress: account.address,
            };

            // Upload the complete KYC data to IPFS
            const kycDataHash = await uploadJSONToPinata(kycJSONData);
            console.log('KYC Data uploaded to IPFS:', kycDataHash);

            // Call the smart contract to register validator profile
            const result = await account.execute({
                contractAddress: FORTICHAIN_CONTRACT_ADDRESS,
                entrypoint: "register_validator_profile",
                calldata: CallData.compile({
                    validator_data_uri: byteArray.byteArrayFromString(kycDataHash),
                    validator_address: account.address,
                }),
            });

            // Wait for transaction confirmation
            const status = await myProvider.waitForTransaction(result.transaction_hash);
            
            if (status.isSuccess()) {
                console.log('KYC submission successful!');
                console.log('Transaction hash:', result.transaction_hash);
                setCurrentStep('complete');
            } else {
                throw new Error('Transaction failed');
            }

        } catch (error) {
            console.error('Error submitting KYC:', error);
            setSubmissionError(error instanceof Error ? error.message : 'Failed to submit KYC');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        let isValid = false;
        
        switch (currentStep) {
            case 'personal':
                isValid = validatePersonalInfo();
                break;
            case 'professional':
                isValid = validateProfessionalBackground();
                break;
            case 'identity':
                isValid = validateIdentityVerification();
                break;
            case 'agreement':
                isValid = validateAgreementCompliance();
                break;
            default:
                isValid = true;
        }
        
        if (isValid) {
            if (currentStep === 'personal') setCurrentStep('professional');
            else if (currentStep === 'professional') setCurrentStep('identity');
            else if (currentStep === 'identity') setCurrentStep('agreement');
            else if (currentStep === 'agreement') {
                // Submit to contract instead of just logging
                submitKYCToContract();
            }
        }
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
        const isLastStep = currentStep === 'agreement';
        const buttonText = isLastStep ? (isSubmitting ? 'Submitting...' : 'Submit KYC') : 'Next';
        
        return (
            <button
                onClick={nextStep}
                disabled={isSubmitting}
                className={`bg-[#0000FF] text-white rounded px-6 py-2 flex items-center justify-center gap-3 w-[180px] hover:bg-blue-700 transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {buttonText}
                {!isLastStep && <MoveRight size={18} className="ml-1" />}
                {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-1"></div>
                )}
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
                            className={`w-full bg-[#161113] border rounded px-4 py-3 text-white ${
                                validationErrors.fullName ? 'border-red-500' : 'border-borderGray'
                            }`}
                            value={kycData.fullName}
                            onChange={(e) => updateKycData('fullName', e.target.value)}
                            placeholder="Enter your full name"
                        />
                        {validationErrors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Date of Birth */}
                        <div className="relative w-full">
                            <label className="block text-sm text-gray-300 mb-2">Date of Birth</label>
                            <div className={`relative bg-[#161113] border rounded ${
                                validationErrors.dateOfBirth ? 'border-red-500' : 'border-borderGray'
                            }`}>
                                <DatePicker
                                    selected={kycData.dateOfBirth}
                                    onChange={(date) => updateKycData('dateOfBirth', date)}
                                    placeholderText="Select Date"
                                    className="w-full bg-[#161113] pl-11 px-4 py-[13px] text-white focus:outline-none"
                                />
                                {/* Calendar Icon */}
                                <CalendarDays
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                    size={20}
                                />
                            </div>
                            {validationErrors.dateOfBirth && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfBirth}</p>
                            )}
                        </div>

                        {/* Nationality */}
                        <div className="relative">
                            <label className="block text-sm text-gray-300 mb-2">Nationality</label>
                            <div className="relative">
                                <select 
                                    className={`w-full bg-[#161113] border rounded px-4 py-3 text-white appearance-none pr-10 ${
                                        validationErrors.nationality ? 'border-red-500' : 'border-borderGray'
                                    }`}
                                    value={kycData.nationality}
                                    onChange={(e) => updateKycData('nationality', e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="nigeria">Nigeria</option>
                                    <option value="france">France</option>
                                    <option value="south-africa">South Africa</option>
                                </select>
                                {/* Chevron Down Icon */}
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>
                            {validationErrors.nationality && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.nationality}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                className={`w-full bg-[#161113] border rounded px-4 py-3 text-white ${
                                    validationErrors.email ? 'border-red-500' : 'border-[#6B6668]'
                                }`}
                                value={kycData.email}
                                onChange={(e) => updateKycData('email', e.target.value)}
                                placeholder="example@example.com"
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                            )}
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
                                        className={`w-full bg-[#161113] border rounded px-14 py-3 text-white ${
                                            validationErrors.phoneNumber ? 'border-red-500' : 'border-borderGray'
                                        }`}
                                        value={kycData.phoneNumber}
                                        onChange={(e) => updateKycData('phoneNumber', e.target.value)}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                            {validationErrors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNumber}</p>
                            )}
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
                    <div>
                        <TagInput 
                            options={programmingLanguages} 
                            label='Programming Language Proficiency' 
                            selectedTags={kycData.programmingLanguages}
                            onTagsChange={(tags) => updateKycData('programmingLanguages', tags)}
                        />
                        {validationErrors.programmingLanguages && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.programmingLanguages}</p>
                        )}
                    </div>

                    <div>
                        <TagInput 
                            options={techOptions} 
                            label='Technical Expertise' 
                            selectedTags={kycData.technicalExpertise}
                            onTagsChange={(tags) => updateKycData('technicalExpertise', tags)}
                        />
                        {validationErrors.technicalExpertise && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.technicalExpertise}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Years of Experience</label>
                        <select
                            className={`w-full bg-[#161113] border rounded px-4 py-3 text-white appearance-none ${
                                validationErrors.yearsExperience ? 'border-red-500' : 'border-borderGray'
                            }`}
                            value={kycData.yearsExperience}
                            onChange={(e) => updateKycData('yearsExperience', e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                        </select>
                        {validationErrors.yearsExperience && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.yearsExperience}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Website/Portfolio</label>
                        <input
                            type="text"
                            className="w-full bg-[#161113] border border-borderGray rounded text-[12px] px-4 py-3 text-white"
                            value={kycData.website}
                            onChange={(e) => updateKycData('website', e.target.value)}
                            placeholder="URL website"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">GitHub Profile URL</label>
                        <input
                            type="text"
                            className={`w-full bg-[#161113] border rounded text-[12px] px-4 py-3 text-white ${
                                validationErrors.githubUrl ? 'border-red-500' : 'border-[#6B6668]'
                            }`}
                            value={kycData.githubUrl}
                            onChange={(e) => updateKycData('githubUrl', e.target.value)}
                            placeholder="https://github.com/username"
                        />
                        {validationErrors.githubUrl && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.githubUrl}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">LinkedIn Profile URL</label>
                        <input
                            type="text"
                            className="w-full bg-[#161113] border border-[#6B6668] rounded text-[12px] px-4 py-3 text-white"
                            value={kycData.linkedinUrl}
                            onChange={(e) => updateKycData('linkedinUrl', e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Resume/CV Upload:</label>
                        <div className={`flex items-center flex-wrap md:flex-nowrap border rounded-lg ${
                            validationErrors.resumeFile ? 'border-red-500' : 'border-borderGray'
                        }`}>
                            <div className="w-full md:flex-grow flex items-center rounded-l px-4 py-1 text-gray-400 gap-3">
                                <div className='w-[48px] h-[48px] bg-[#464043] rounded-full flex items-center justify-center'>
                                    <CloudUpload color='#CCCCFF' size={21} className="flex-shrink-0" />
                                </div>
                                <div className="flex justify-start flex-col">
                                    <span className="truncate text-[14px]">
                                        {kycData.resumeFile ? kycData.resumeFile.name : 'Upload your document'}
                                    </span>
                                    <span className="text-xs hidden sm:inline">PDF, Docx • Max. 3MB</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    updateKycData('resumeFile', file);
                                }}
                                className="hidden"
                                id="resume-upload"
                            />
                            <label 
                                htmlFor="resume-upload"
                                className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
                            >
                                Upload
                            </label>
                        </div>
                        {validationErrors.resumeFile && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.resumeFile}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Certifications (Optional)</label>
                        <div className="flex items-center flex-wrap md:flex-nowrap border rounded-lg border-borderGray">
                            <div className="w-full md:flex-grow flex items-center rounded-l px-4 py-1 gap-3 text-gray-400">
                                <div className='w-[48px] h-[48px] bg-[#464043] rounded-full flex items-center justify-center'>
                                    <CloudUpload color='#CCCCFF' size={21} className="flex-shrink-0" />
                                </div>
                                <div className="flex justify-start flex-col">
                                    <span className="truncate text-[14px]">
                                        {kycData.certificationsFile ? kycData.certificationsFile.name : 'Upload your document'}
                                    </span>
                                    <span className="text-xs hidden sm:inline">600px by 600px (PNG, JPG) • Max. 3MB</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    updateKycData('certificationsFile', file);
                                }}
                                className="hidden"
                                id="certifications-upload"
                            />
                            <label 
                                htmlFor="certifications-upload"
                                className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
                            >
                                Upload
                            </label>
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
                                    className={`flex justify-between items-center w-full bg-[#161113] border rounded px-4 py-3 text-[#B5B3B4] cursor-pointer ${
                                        validationErrors.country ? 'border-red-500' : 'border-borderGray'
                                    }`}
                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                >
                                    <span>{kycData.country || 'Select Country'}</span>
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
                                                        updateKycData('country', c);
                                                        setShowCountryDropdown(false);
                                                    }}
                                                >
                                                    {c}
                                                    {kycData.country === c && <Check size={16} />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {validationErrors.country && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.country}</p>
                            )}
                        </div>

                        <div className='w-full max-w-[350px]'>
                            <label className="block text-sm text-white font-bold mb-2">Document Type</label>
                            <div className="relative max-w-[350px] h-[60]">
                                <div
                                    className={`flex justify-between items-center w-full bg-[#161113] border rounded px-4 py-3 text-[#B5B3B4] cursor-pointer ${
                                        validationErrors.documentType ? 'border-red-500' : 'border-borderGray'
                                    }`}
                                    onClick={() => setShowDocTypeDropdown(!showDocTypeDropdown)}
                                >
                                    <span>{kycData.documentType || 'Select a document type'}</span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>

                                {showDocTypeDropdown && (
                                    <div className="absolute top-full left-0 w-full bg-[#0B090A] border-gray-700 rounded mt-1 z-10 max-h-48 overflow-y-auto">
                                        {documentTypes.map((type, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                                                onClick={() => {
                                                    updateKycData('documentType', type);
                                                    setShowDocTypeDropdown(false);
                                                }}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {validationErrors.documentType && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.documentType}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between gap-4">
                        <div>
                            <div className={`bg-[#110D0F] max-w-[350px] h-[207px] border rounded p-6 flex flex-col items-center justify-center text-center ${
                                validationErrors.frontDocument ? 'border-red-500' : 'border-[#464043]'
                            }`}>
                                <Upload size={24} className="text-white mb-2" />
                                <h4 className="text-white mb-1">Front side of your document</h4>
                                <p className="text-[#908C8E] text-sm mb-4">Upload the front side of your document (PDF, PNG, JPG)</p>
                                <input
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        updateKycData('frontDocument', file);
                                    }}
                                    className="hidden"
                                    id="front-document-upload"
                                />
                                <label 
                                    htmlFor="front-document-upload"
                                    className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>
                            {validationErrors.frontDocument && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.frontDocument}</p>
                            )}
                        </div>

                        <div>
                            <div className={`bg-[#110D0F] max-w-[350px] h-[207px] border rounded p-6 flex flex-col items-center justify-center text-center ${
                                validationErrors.backDocument ? 'border-red-500' : 'border-[#464043]'
                            }`}>
                                <Upload size={24} className="text-white mb-2" />
                                <h4 className="text-white mb-1">Back side of your document</h4>
                                <p className="text-[#908C8E] text-sm mb-4">Upload the back side of your document (PDF, PNG, JPG)</p>
                                <input
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        updateKycData('backDocument', file);
                                    }}
                                    className="hidden"
                                    id="back-document-upload"
                                />
                                <label 
                                    htmlFor="back-document-upload"
                                    className="mx-3 bg-[#0000FF] w-[159px] h-9 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>
                            {validationErrors.backDocument && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.backDocument}</p>
                            )}
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
                        <div 
                            className={`w-6 h-6 rounded-sm flex items-center justify-center mr-3 cursor-pointer ${
                                kycData.ndaAgreement ? 'bg-[#0000FF]' : 'bg-[#464043] border border-gray-600'
                            }`}
                            onClick={() => updateKycData('ndaAgreement', !kycData.ndaAgreement)}
                        >
                            {kycData.ndaAgreement && <Check size={16} className="text-white" />}
                        </div>
                        <span className="text-white">I agree to the Non-Disclosure Agreement</span>
                    </div>
                    {validationErrors.ndaAgreement && (
                        <p className="text-red-500 text-sm ml-9">{validationErrors.ndaAgreement}</p>
                    )}

                    <div className="flex items-center">
                        <div 
                            className={`w-6 h-6 rounded-sm flex items-center justify-center mr-3 cursor-pointer ${
                                kycData.codeOfConduct ? 'bg-[#0000FF]' : 'bg-[#464043] border border-gray-600'
                            }`}
                            onClick={() => updateKycData('codeOfConduct', !kycData.codeOfConduct)}
                        >
                            {kycData.codeOfConduct && <Check size={16} className="text-white" />}
                        </div>
                        <span className="text-white">I agree to the Code of Conduct</span>
                    </div>
                    {validationErrors.codeOfConduct && (
                        <p className="text-red-500 text-sm ml-9">{validationErrors.codeOfConduct}</p>
                    )}
                </div>

                {submissionError && (
                    <div className="mt-4 p-3 bg-red-900 border border-red-500 rounded text-red-200 text-sm">
                        {submissionError}
                    </div>
                )}
                
                <div className="flex justify-center gap-4 mt-10">
                    <BackButton />
                    <NextButton />
                </div>
            </div>
        );
    };

    const renderComplete = () => {
        return (
            <div className="text-center w-full h-full py-8">
                <h2 className="text-2xl font-semibold text-white mb-4">KYC Submission Complete!</h2>

                <p className="text-gray-300 mb-1">
                    Your KYC submission has been received<br />
                    Our team is reviewing your information.
                </p>

                <hr className="border-t border-[#464043] mb-4" />

                <div className="flex justify-center mb-8 mt-12">
                    <Image src={CheckIcon} alt="Check Icon" />
                </div>

                <div className="bg-[#0B090A] border border-[#464043] rounded-lg p-4 mb-6">
                    <h3 className="text-white font-medium mb-2">Submission Details</h3>
                    <p className="text-gray-300 text-sm mb-2">
                        • All documents uploaded to IPFS<br />
                        • KYC data stored securely on blockchain<br />
                        • Validator profile registered successfully
                    </p>
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
                        className={`bg-[#1C1618] rounded-lg border border-[#464043] ${currentStep === "complete" ? "h-[700px] w-[538px]" : "w-full max-w-[910px]"} shadow-xl my-8`}
                    >
                        <div className="p-3 md:p-3 max-h-[100vh] overflow-y-auto">
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