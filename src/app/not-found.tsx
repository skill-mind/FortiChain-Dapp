import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import notFound from "../../public/notFound.svg";
import Image from "next/image";

const Custom404 = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center px-5">
          <Image
            src={notFound}
            alt={"404  page not found"}
            className="cursor-pointer"
          />
          <h1 className=" mt-4 mb-8 text-[22px] font-bold my-5 md:text-[32px]">
            Page Not Found
          </h1>
          <p className="mb-10 text-[18px] font-thin">
            Sorry, we can't find the page you are looking for.
          </p>
          <Link
            href="/"
            className="bg-[#0000FF] font-thin text-white text-[16px]  px-6 py-3 rounded-lg hover:bg-blue-900 transition w-[154px] h-[56px]"
          >
            Go To Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Custom404;
