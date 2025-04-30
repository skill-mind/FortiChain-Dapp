import React, { ReactNode, useState, useEffect } from 'react';
import { Check, ExternalLink, AlertCircle, Bell, ChevronDown, Edit, Pencil, BadgeCheck } from 'lucide-react';
import { IoIosCloseCircle } from "react-icons/io";
import HourGlassIcon from "../../../../public/hourglass-outline.svg"
import Link from 'next/link';
import VerifiedIcon from "../../../../public/blue_verified_icon.svg"
import CancelIcon from "../../../../public/cancel_symbol.svg"
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import KYCModal from '@/components/dashboard/KYCModal';

interface ProfilePageProps {
    status?: 'pending' | 'verified' | 'rejected' | 'na';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ status = 'verified' }) => {
    const [profileStatus, setProfileStatus] = useState<'pending' | 'verified' | 'rejected' | 'na'>(status);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Mock data based on screenshots
    const profileData = {
        fullName: profileStatus === 'na' ? 'N/A' : 'Daniel Ochoja',
        dateOfBirth: profileStatus === 'na' ? 'N/A' : '18th November, 2025',
        email: profileStatus === 'na' ? 'N/A' : 'danielochoja@gmail.com',
        nationality: profileStatus === 'na' ? 'N/A' : 'NIGERIAN',
        phoneNumber: profileStatus === 'na' ? 'N/A' : '+234 817 006 1600',
        programmingLanguages: ['Rust', 'Cairo', 'Solidity', 'Solidity', 'Python'],
        technicalExpertise: ['Blockchain Security', 'Smart Contract', 'Cloud Engineering', 'Penetration Testing'],
        yearsOfExperience: profileStatus === 'na' ? 'N/A' : '8 Years',
        githubProfile: profileStatus === 'na' ? 'N/A' : 'github.com/username/repo',
        linkedinProfile: profileStatus === 'na' ? 'N/A' : 'linkedin.com/in/username',
        cvResume: profileStatus === 'na' ? 'N/A' : 'View CV',
        websitePortfolio: profileStatus === 'na' ? 'N/A' : 'View Website',
    };

    function InfoContainer({ leftItem, rightItem, index }: { leftItem: string, rightItem: string | ReactNode, index: number }) {
        return (
            <motion.div 
                className='flex items-center justify-between'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
            >
                <div className="font-bold text-[14px]">{leftItem}</div>
                <div className='text-[18px]'>{rightItem}</div>
            </motion.div>
        )
    }

    function KYCButton({ handleClick, buttonText, buttonIcon, className }: { handleClick?: () => void, buttonText: string, buttonIcon?: ReactNode, className?: string }) {
        return (
            <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <button 
                    onClick={handleClick} 
                    className={`min-w-[${className ? "" : "144px"}] h-[36px] flex justify-center gap-1 items-center bg-[#0000FF] text-[14px] rounded-lg ${className} transition-colors duration-200 hover:bg-[#1a1aff]`}
                >
                    {buttonText} {buttonIcon}
                </button>
            </motion.div>
        )
    }

    const getStatusBadge = () => {
        switch (profileStatus) {
            case 'pending':
                return (
                    <motion.div 
                        className="flex items-center h-[48px] px-4 bg-[#0B090A] border border-borderGray rounded-full text-base"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        Pending Verification <Image src={HourGlassIcon} alt="Hourglass" className="ml-1 w-6 h-6" />
                    </motion.div>
                );
            case 'verified':
                return (
                    <motion.div 
                        className="flex items-center px-6 py-3 bg-[#0B090A] border border-[#464043] rounded-full text-xs"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        Profile Verified <Image src={VerifiedIcon} alt='verified-icon' className="ml-1 w-5 h-5 text-[#0000FF]" />
                    </motion.div>
                );
            case 'rejected':
                return (
                    <motion.div 
                        className="flex items-center justify-center gap-2 w-full max-w-[200px] h-[48px] bg-[#0B090A] border border-borderGray rounded-full text-base"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        Profile Rejected<Image src={CancelIcon} alt='cancel-icon' className="ml-1 w-4 h-4 text-[#FF0000]" />
                    </motion.div>
                );
            case 'na':
                return null;
        }
    };

    const renderActionButton = () => {
        switch (profileStatus) {
            case 'pending':
                return (
                    <motion.button 
                        className="px-3 py-1 border bg-blue-600 rounded-full text-xs text-white flex items-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Under Review
                    </motion.button>
                );
            case 'na':
                return (
                    <>
                    <KYCModal className='w-[101px]' buttonText='Start KYC' />
                    </>
                );
            case 'verified':
                return (
                    <KYCModal className='px-3' buttonIcon={<Pencil className="ml-1 w-[13px] h-[13px]" />} buttonText='Restart KYC' />
                );
            case 'rejected':
                return (
                    <KYCModal buttonIcon={<Pencil className="ml-1 w-4 h-4" />} buttonText='Restart KYC' />
                );
        }
    };

    const getStatusContent = () => {
        switch (profileStatus) {
            case 'pending':
                return null;
            case 'na':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-sm text-gray-300 mb-4">
                            No information added yet. Start KYC to add profile information.
                        </div>
                        {renderActionButton()}
                    </motion.div>
                );
            case 'verified':
                return null;
        }
    };
    
    const renderSectionStatus = (section: string) => {
        if (profileStatus === 'rejected' && section === 'professional') {
            return (
                <motion.div 
                    className="px-3 bg-[#AE2727] border border-borderGray w-[104px] h-[33px] rounded-full text-xs text-white flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Rejected
                </motion.div>
            );
        } else if (profileStatus === 'rejected' && section === 'personal') {
            return (
                <motion.div 
                    className="px-3 border border-borderGray bg-[#000033] w-[104px] h-[33px] rounded-full text-xs text-white flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Approved
                </motion.div>
            );
        } else if (profileStatus === 'verified') {
            return null
        }
        else if (profileStatus !== 'na') {
            return (
                <motion.button 
                    className="px-3 py-1 border border-[#B5B3B4] rounded-full text-xs text-white flex items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Under Review
                </motion.button>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen text-white">
            <motion.div 
                className="mx-auto w-full max-w-[911px] md:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="bg-[#1C1618] border border-[#464043] rounded-2xl p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold">Profile Details</h2>
                            {profileStatus === "rejected" && 
                            <motion.div 
                                className="text-[13px] text-gray-300 mt-4 max-w-[100%] mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                Unfortunately, your KYC submission could not be verified. Please review your documents and ensure all information is accurate and clearly visible. You may restart the KYC process and reapply at any time.
                            </motion.div>}
                        </motion.div>
                        {getStatusBadge()}
                    </div>

                    {getStatusContent()}

                    <AnimatePresence>
                        {profileStatus === 'verified' || profileStatus === 'rejected' || profileStatus === 'pending' ? (
                            <>
                                <motion.div 
                                    className="bg-[#0B090A] rounded-lg p-4 mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold">Personal Information</h3>
                                        {renderSectionStatus('personal')}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 mt-6">
                                        <InfoContainer index={0} leftItem='Full Name' rightItem={profileData.fullName} />

                                        <motion.hr 
                                            className='border-t border-[#464043]'
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                        />

                                        <InfoContainer index={1} leftItem='Date of Birth' rightItem={profileData.dateOfBirth} />

                                        <motion.hr 
                                            className='border-t border-[#464043]'
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.4, delay: 0.3 }}
                                        />

                                        <InfoContainer index={2} leftItem='Email Address' rightItem={profileData.email} />

                                        <motion.hr 
                                            className='border-t border-[#464043]'
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.4, delay: 0.4 }}
                                        />

                                        <InfoContainer index={3} leftItem='Nationality' rightItem={profileData.nationality} />

                                        <motion.hr 
                                            className='border-t border-[#464043]'
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.4, delay: 0.5 }}
                                        />

                                        <InfoContainer index={4} leftItem='Phone Number' rightItem={profileData.phoneNumber} />


                                        <motion.div 
                                            className="flex items-center justify-between"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6, duration: 0.3 }}
                                        >
                                            {profileStatus === 'verified' && (
                                                <KYCModal className='px-5' buttonIcon={<Pencil className="ml-1 w-[13px] h-[13px]" />} buttonText='Restart KYC' />

                                            )}
                                            {profileStatus === 'rejected' && (
                                                <KYCModal className='px-5' buttonIcon={<Pencil className="ml-1 w-[13px] h-[13px]" />} buttonText='Restart KYC' />
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="bg-[#0B090A] rounded-lg p-4 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold">Professional Background</h3>
                                        {renderSectionStatus('professional')}
                                    </div>
                                    <div>
                                        <motion.div 
                                            className="mb-5 mt-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.4 }}
                                        >
                                            <div className="font-bold text-[18] mb-3">Programming Languages</div>
                                            <div className="flex flex-wrap gap-2">
                                                {profileData.programmingLanguages.map((lang, index) => (
                                                    <motion.span 
                                                        key={index} 
                                                        className="px-3 mb-2 py-1 bg-transparent border border-[#464043] rounded-full text-xs hover:bg-opacity-20 hover:bg-blue-500 transition-colors duration-300"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {lang}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            <motion.hr 
                                                className='border-t border-[#464043]'
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.4, delay: 0.5 }}
                                            />
                                        </motion.div>

                                        <motion.div 
                                            className="mb-5"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.4 }}
                                        >
                                            <div className="font-bold text-[18] mb-3">Technical Expertise</div>
                                            <div className="flex flex-wrap gap-2">
                                                {profileData.technicalExpertise.map((expertise, index) => (
                                                    <motion.span 
                                                        key={index} 
                                                        className="px-3 mb-2 py-1 bg-transparent border border-[#464043] rounded-full text-xs hover:bg-opacity-20 hover:bg-blue-500 transition-colors duration-300"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {expertise}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            <motion.hr 
                                                className='border-t border-[#464043]'
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.4, delay: 0.6 }}
                                            />
                                        </motion.div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <InfoContainer index={0} leftItem='Years of Experience' rightItem={profileData.yearsOfExperience} />

                                            <motion.hr 
                                                className='border-t border-[#464043]'
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.4, delay: 0.7 }}
                                            />

                                            <InfoContainer 
                                                index={1} 
                                                leftItem='Github Profile' 
                                                rightItem={
                                                    <motion.div whileHover={{ scale: 1.02, x: 3 }} transition={{ duration: 0.2 }}>
                                                        <Link href="#" className="text-blue-500 flex items-center">
                                                            github.com/ochoja <ExternalLink className="ml-1 w-4 h-4" />
                                                        </Link>
                                                    </motion.div>
                                                }
                                            />

                                            <motion.hr 
                                                className='border-t border-[#464043]'
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.4, delay: 0.8 }}
                                            />

                                            <InfoContainer 
                                                index={2}
                                                leftItem='LinkedIn Profile' 
                                                rightItem={
                                                    <motion.div whileHover={{ scale: 1.02, x: 3 }} transition={{ duration: 0.2 }}>
                                                        <Link href="#" className="text-blue-500 flex items-center justify-end">
                                                            linkedin.com/in/ochoja <ExternalLink className="ml-1 w-4 h-4" />
                                                        </Link>
                                                    </motion.div>
                                                } 
                                            />

                                            <motion.hr 
                                                className='border-t border-[#464043]'
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.4, delay: 0.9 }}
                                            />

                                            <InfoContainer 
                                                index={3}
                                                leftItem='CV/Resume' 
                                                rightItem={
                                                    <motion.div whileHover={{ scale: 1.02, x: 3 }} transition={{ duration: 0.2 }}>
                                                        <Link href="#" className="text-blue-500 flex items-center">
                                                            View CV <ExternalLink className="ml-1 w-4 h-4" />
                                                        </Link>
                                                    </motion.div>
                                                }
                                            />

                                            <motion.hr 
                                                className='border-t border-[#464043]'
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                transition={{ duration: 0.4, delay: 1.0 }}
                                            />

                                            <InfoContainer 
                                                index={4}
                                                leftItem='Website/Portfolio' 
                                                rightItem={
                                                    <motion.div whileHover={{ scale: 1.02, x: 3 }} transition={{ duration: 0.2 }}>
                                                        <Link href="#" className="text-blue-500 flex items-center justify-end">
                                                            View Website <ExternalLink className="ml-1 w-4 h-4" />
                                                        </Link>
                                                    </motion.div>
                                                }
                                            />

                                            <div>
                                                <div className="text-gray-400 text-sm"></div>
                                                <div>{ }</div>
                                            </div>
                                            <motion.div 
                                                className="text-right"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.1, duration: 0.3 }}
                                            >
                                                {profileStatus === 'rejected' && (
                                                    <motion.button 
                                                        className="px-3 py-1 bg-blue-600 rounded-full text-xs text-white flex items-center"
                                                        whileHover={{ scale: 1.05, backgroundColor: "#2233ff" }}
                                                        whileTap={{ scale: 0.98 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        Edit Details <Edit className="ml-1 w-4 h-4" />
                                                    </motion.button>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            <motion.div 
                                className="bg-[#0B090A] rounded-lg p-4 mt-6 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <h1 className='font-bold text-white'>Personal Information</h1>
                                <div className="grid grid-cols-1 gap-3 mt-5">
                                    <InfoContainer index={0} leftItem='Full Name' rightItem={profileData.fullName} />
                                    
                                    <motion.hr 
                                        className='border-t border-[#464043]'
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                    />

                                    <InfoContainer index={1} leftItem='Date of Birth' rightItem={profileData.dateOfBirth} />

                                    <motion.hr 
                                        className='border-t border-[#464043]'
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.4, delay: 0.4 }}
                                    />

                                    <InfoContainer index={2} leftItem='Email Address' rightItem={profileData.email} />

                                    <motion.hr 
                                        className='border-t border-[#464043]'
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.4, delay: 0.5 }}
                                    />

                                    <InfoContainer index={3} leftItem='Nationality' rightItem={profileData.nationality} />

                                    <motion.hr 
                                        className='border-t border-[#464043]'
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                    />

                                    <InfoContainer index={4} leftItem='Phone Number' rightItem={profileData.phoneNumber} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;