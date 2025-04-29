import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil } from "lucide-react";

interface FormData {
  name: string;
  description: string;
  contractAddress: string;
  contactInfo: string;
  repository: string;
}

export default function ReviewSubmissionPage({ formData }: { formData: FormData }) {
 return (
   <div className="space-y-6 ">
     <div className="space-y-6">
       <div className="bg-[#161113] p-5 rounded-[20px]">
         <h3 className="text-base text-white mb-2 border-b-[#211A1D] border-b pb-2 ">
           Basic Information
         </h3>
         <div className="grid grid-cols-1 gap-4">
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Project Name:</p>
             <p className="text-white">{formData.name}</p>
           </div>
           <div className="grid grid-cols-2 items-center">
             <p className="text-sm text-gray-400">Description:</p>
             <p className="text-white">{formData.description}</p>
           </div>
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Smart Contract Address:</p>
             <p className="text-white">{formData.contractAddress}</p>
           </div>
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Contact Information:</p>
             <p className="text-white">{formData.contactInfo}</p>
           </div>
         </div>
         <div className="flex justify-end">
           <Button
             variant="outline"
             type="button"
             className=" mt-2 flex justify-between items-center text-xs bg-[#5555FF] text-white border-none"
           >
             <Pencil />
             <span>Edit Details</span>
           </Button>
         </div>
       </div>
       <div className="bg-[#161113] p-5 rounded-[20px]">
         <h3 className="text-base text-white mb-2 border-b-[#211A1D] border-b pb-2 ">
           Ownership Verification / Project Repository
         </h3>
         <div className="grid grid-cols-1 gap-4">
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Verified Using:</p>
             <p className="text-white">GitHub</p>
           </div>
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Repository Link:</p>
             <p className="text-[#0000FF]">{formData.repository}</p>
           </div>
         </div>
         <div className="flex justify-end">
           <Button
             variant="outline"
             type="button"
             className=" mt-2 flex justify-between items-center text-xs bg-[#5555FF] text-white border-none"
           >
             <Pencil />
             <span>Edit Details</span>
           </Button>
         </div>
       </div>
       <div className="bg-[#161113] p-5 rounded-[20px]">
         <h3 className="text-base text-white mb-2 border-b-[#211A1D] border-b pb-2 ">
           Ownership Verification / Project Repository
         </h3>
         <div className="grid grid-cols-1 gap-4">
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Verified Using:</p>
             <p className="text-white">GitHub</p>
           </div>
           <div className="flex justify-between items-center">
             <p className="text-sm text-gray-400">Repository Link:</p>
             <p className="text-[#0000FF]">{formData.repository}</p>
           </div>
         </div>
         <div className="flex justify-end">
           <Button
             variant="outline"
             type="button"
             className=" mt-2 flex justify-between items-center text-xs bg-[#5555FF] text-white border-none"
           >
             <Pencil />
             <span>Edit Details</span>
           </Button>
         </div>
       </div>

       <div className="flex items-center space-x-2">
         <Checkbox
           id="confirmDetails"
           className="data-[state=checked]:bg-blue-600"
         />
         <label
           htmlFor="confirmDetails"
           className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
         >
           I confirm all details are correct
         </label>
       </div>
     </div>
   </div>
 ); 
}