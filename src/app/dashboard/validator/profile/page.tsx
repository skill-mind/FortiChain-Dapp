"use client";

// app/dashboard/validator/profile/page.tsx
import { Suspense } from "react";
import ProfileClient from "./profile-client";
import ProfilePage from "../../components/profile-page";

export default function ProfilePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <ProfileClient /> */}
      <ProfilePage />
    </Suspense>
  );
}
