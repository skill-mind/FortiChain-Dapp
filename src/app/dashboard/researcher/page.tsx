import { redirect } from "next/navigation";

const page = () => {
  redirect("/dashboard/researcher/overview");
};

export default page;
