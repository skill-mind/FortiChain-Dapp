import { redirect } from "next/navigation";

const page = () => {
  redirect("/dashboard/validator/overview");
};

export default page;
