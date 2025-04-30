
// app/dashboard/validator/profile/page.tsx
import { Suspense } from "react";
import ProfileClient from "./profile-client";

export default function ProfilePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileClient />
    </Suspense>
  );
}

