"use client";

import { useSearchParams } from 'next/navigation';
import ProfilePage from '../../components/profile-page';

export default function ProfileClient() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') as string | null;

  const allowedStatuses = ["pending", "verified", "rejected", "na"] as const;
  type ProfileStatus = typeof allowedStatuses[number];

  // Validate status, default to "pending" if invalid
  const profileStatus: ProfileStatus = allowedStatuses.includes(statusParam as ProfileStatus)
    ? (statusParam as ProfileStatus)
    : "pending";

  return <ProfilePage status={profileStatus} />;
}
