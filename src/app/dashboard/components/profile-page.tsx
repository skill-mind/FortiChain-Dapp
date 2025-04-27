// src/components/ProfilePage.tsx
import React, { ReactNode, useState } from 'react';
import { Check, ExternalLink, AlertCircle, Bell, ChevronDown, Edit, Pencil, BadgeCheck } from 'lucide-react';
import { IoIosCloseCircle } from "react-icons/io";
import HourGlassIcon from "../../../../public/hourglass-outline.svg"
import Link from 'next/link';
import VerifiedIcon from "../../../../public/blue_verified_icon.svg"
import CancelIcon from "../../../../public/cancel_symbol.svg"
import Image from 'next/image';

interface ProfilePageProps {
    status?: 'pending' | 'verified' | 'rejected' | 'na';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ status = 'verified' }) => {
    const [profileStatus, setProfileStatus] = useState<'pending' | 'verified' | 'rejected' | 'na'>(status);

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

    function InfoContainer({ leftItem, rightItem }: { leftItem: string, rightItem: string | ReactNode }) {
        return (
            <div className='flex items-center justify-between'>
                <div className="font-bold text-[14px]">{leftItem}</div>
                <div className='text-[18px]'>{rightItem}</div>
            </div>
        )
    }

    function KYCButton({ handleClick, buttonText, buttonIcon, className }: { handleClick?: () => void, buttonText: string, buttonIcon?: ReactNode, className?: string }) {
        return (
            <div className="">
                <button onClick={handleClick} className={`min-w-[${className ? "" : "144px"}] h-[36px] flex justify-center gap-1 items-center bg-[#0000FF] text-[14px] rounded-lg ${className}`}>{buttonText} {buttonIcon}</button>
            </div>
        )
    }

    const getStatusBadge = () => {
        switch (profileStatus) {
            case 'pending':
                return (
                    <div className="flex items-center h-[48px] px-4 bg-[#0B090A] border border-borderGray rounded-full text-base">
                        Pending Verification <Image src={HourGlassIcon} alt="Hourglass" className="ml-1 w-6 h-6" />
                    </div>
                );
            case 'verified':
                return (
                    <div className="flex items-center px-6 py-3 bg-[#0B090A] border border-[#464043] rounded-full text-xs">
                        Profile Verified <Image src={VerifiedIcon} alt='verified-icon' className="ml-1 w-5 h-5 text-[#0000FF]" />
                    </div>
                );
            case 'rejected':
                return (
                    <div className="flex items-center justify-center gap-2 w-full max-w-[200px] h-[48px] bg-[#0B090A] border border-borderGray rounded-full text-base">
                        Profile Rejected<Image src={CancelIcon} alt='cancel-icon' className="ml-1 w-4 h-4 text-[#FF0000]" />
                    </div>
                );
            case 'na':
                return null;
        }
    };



    const renderActionButton = () => {
        switch (profileStatus) {
            case 'pending':
                return (
                    <button className="px-3 py-1 border bg-blue-600 rounded-full text-xs text-white flex items-center">
                        Under Review
                    </button>
                );
            case 'na':
                return (
                    <KYCButton className='w-[101px]' buttonText='Start KYC' />
                );
            case 'verified':
                return (
                    <KYCButton buttonIcon={<Pencil className="ml-1 w-[13px] h-[13px]" />} buttonText='Restart KYC' />
                );
            case 'rejected':
                return (
                    <KYCButton buttonIcon={<Pencil className="ml-1 w-4 h-4" />} buttonText='Restart KYC' />

                );
        }
    };

    const getStatusContent = () => {
        switch (profileStatus) {
            case 'pending':
                return null;
            case 'na':
                return (
                    <>
                        <div className="text-sm text-gray-300 mb-4">
                            No information added yet. Start KYC to add profile information.
                        </div>
                        {renderActionButton()}
                    </>
                );
            case 'verified':
                return null;
            // case 'rejected':
            //     return (
            //         <div className="text-sm text-gray-300 mb-4">
            //             Unfortunately, your KYC submission could not be verified. Please review your documents and ensure all information is accurate and clearly visible. You may restart the KYC process and reapply at any time.
            //         </div>
            //     );
        }
    };
    const renderSectionStatus = (section: string) => {
        if (profileStatus === 'rejected' && section === 'professional') {
            return (
                <div className="px-3 bg-[#AE2727] border border-borderGray w-[104px] h-[33px] rounded-full text-xs text-white flex justify-center items-center">
                    Rejected
                </div>
            );
        } else if (profileStatus === 'rejected' && section === 'personal') {
            return (
                <div className="px-3 border border-borderGray bg-[#000033] w-[104px] h-[33px] rounded-full text-xs text-white flex justify-center items-center">
                    Approved
                </div>
            );
        } else if (profileStatus === 'verified') {
            return null
        }
        else if (profileStatus !== 'na') {
            return (
                <button className="px-3 py-1 border border-[#B5B3B4] rounded-full text-xs text-white flex items-center">
                    Under Review
                </button>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen text-white">
            <div className="mx-auto w-full max-w-[911px] p-4">
                <div className="bg-[#1C1618]  border border-[#464043] rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">Profile Details</h2>
                            {profileStatus === "rejected" && <div className="text-[13px] text-gray-300 mt-4 max-w-[100%] mb-4">
                                Unfortunately, your KYC submission could not be verified. Please review your documents and ensure all information is accurate and clearly visible. You may restart the KYC process and reapply at any time.
                            </div>}
                        </div>
                        {getStatusBadge()}
                    </div>

                    {getStatusContent()}

                    {profileStatus === 'verified' || profileStatus === 'rejected' || profileStatus === 'pending' ? (
                        <>
                            <div className="bg-[#0B090A] rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold">Personal Information</h3>
                                    {renderSectionStatus('personal')}
                                </div>
                                <div className="grid grid-cols-1 gap-4 mt-6">
                                    <InfoContainer leftItem='Full Name' rightItem={profileData.fullName} />

                                    <hr className='border-t border-[#464043]' />

                                    <InfoContainer leftItem='Date of Birth' rightItem={profileData.dateOfBirth} />

                                    <hr className='border-t border-[#464043]' />

                                    <InfoContainer leftItem='Email Address' rightItem={profileData.email} />

                                    <hr className='border-t border-[#464043]' />

                                    <InfoContainer leftItem='Nationality' rightItem={profileData.nationality} />

                                    <hr className='border-t border-[#464043]' />

                                    <InfoContainer leftItem='Phone Number' rightItem={profileData.phoneNumber} />


                                    <div className="flex items-center justify-between">
                                        {profileStatus === 'verified' && (
                                            <KYCButton buttonIcon={<Pencil className="ml-1 w-[13px] h-[13px]" />} buttonText='Restart KYC' />

                                        )}
                                        {profileStatus === 'rejected' && (
                                            <KYCButton buttonIcon={<Pencil className="ml-1 w-[13px] h-[13px]" />} buttonText='Restart KYC' />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0B090A] rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold">Professional Background</h3>
                                    {renderSectionStatus('professional')}
                                </div>
                                <div>
                                    <div className="mb-5 mt-6 ">
                                        <div className="font-bold text-[18] mb-3">Programming Languages</div>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.programmingLanguages.map((lang, index) => (
                                                <span key={index} className="px-3 mb-2 py-1 bg-transparent border border-[#464043] rounded-full text-xs">
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                        <hr className='border-t border-[#464043]' />
                                    </div>

                                    <div className="mb-5">
                                        <div className="font-bold text-[18] mb-3">Technical Expertise</div>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.technicalExpertise.map((expertise, index) => (
                                                <span key={index} className="px-3 mb-2 py-1 bg-transparent border border-[#464043] rounded-full text-xs">
                                                    {expertise}
                                                </span>
                                            ))}
                                        </div>
                                        <hr className='border-t border-[#464043]' />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <InfoContainer leftItem='Years of Experience' rightItem={profileData.yearsOfExperience} />

                                        <hr className='border-t border-[#464043]' />

                                        <InfoContainer leftItem='Github Profile' rightItem={
                                            <Link href="#" className="text-blue-500 flex items-center">
                                                github.com/ochoja <ExternalLink className="ml-1 w-4 h-4" />
                                            </Link>}
                                        />

                                        <hr className='border-t border-[#464043]' />

                                        <InfoContainer leftItem='LinkedIn Profile' rightItem={
                                            <Link href="#" className="text-blue-500 flex items-center justify-end">
                                                linkedin.com/in/ochoja <ExternalLink className="ml-1 w-4 h-4" />
                                            </Link>
                                        } />

                                        <hr className='border-t border-[#464043]' />

                                        <InfoContainer leftItem='CV/Resume' rightItem={
                                            <Link href="#" className="text-blue-500 flex items-center">
                                                View CV <ExternalLink className="ml-1 w-4 h-4" />
                                            </Link>
                                        } />

                                        <hr className='border-t border-[#464043]' />

                                        <InfoContainer leftItem='Website/Portfolio' rightItem={
                                            <Link href="#" className="text-blue-500 flex items-center justify-end">
                                                View Website <ExternalLink className="ml-1 w-4 h-4" />
                                            </Link>
                                        } />

                                        <div>
                                            <div className="text-gray-400 text-sm"></div>
                                            <div>{ }</div>
                                        </div>
                                        <div className="text-right">
                                            {profileStatus === 'rejected' && (
                                                <button className="px-3 py-1 bg-blue-600 rounded-full text-xs text-white flex items-center">
                                                    Edit Details <Edit className="ml-1 w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-[#0B090A] rounded-lg p-4 mt-6 mb-4">
                            <h1 className='font-bold text-white'>Personal Information</h1>
                            <div className="grid grid-cols-1 gap-3 mt-5">


                                <InfoContainer leftItem='Full Name' rightItem={profileData.fullName} />
                                <hr className='border-t border-[#464043]' />

                                <InfoContainer leftItem='Date of Birth' rightItem={profileData.dateOfBirth} />

                                <hr className='border-t border-[#464043]' />

                                <InfoContainer leftItem='Email Address' rightItem={profileData.email} />

                                <hr className='border-t border-[#464043]' />

                                <InfoContainer leftItem='Nationality' rightItem={profileData.nationality} />

                                <hr className='border-t border-[#464043]' />

                                <InfoContainer leftItem='Phone Number' rightItem={profileData.phoneNumber} />

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;