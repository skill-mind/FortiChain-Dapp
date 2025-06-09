import { redirect } from "next/navigation";

const page = () => {
  redirect("/dashboard/project-owner/overview");
};

export default page;
