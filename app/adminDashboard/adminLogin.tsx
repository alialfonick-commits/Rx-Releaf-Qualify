import { FingerprintPattern } from "lucide-react";
import { Input } from "../components/patientInputComp"
import { Button } from "@/components/ui/button"
import {
 AlertDialog,
 AlertDialogTrigger,
 AlertDialogContent,
 AlertDialogHeader,
 AlertDialogTitle,
} from "../components/paymentlinkDialogComp"

export default function AdminLogin() {
 return (
  <>

   <AlertDialog>
    <AlertDialogTrigger asChild>
     <button className="flex items-center gap-2 border w-fit bg-[#EEB32B26] border-[#F5A623] text-[#322A1B] px-2 py-1 rounded-lg font-semibold cursor-pointer">
      open dialog
     </button>
    </AlertDialogTrigger>

    <AlertDialogContent
     className="rounded-xl overflow-hidden p-0 bg-white border-transparent">
     <AlertDialogHeader className="bg-[#5E6E66] py-6 text-white [&_p]:font-light [&_p]:text-sm [&_p]:text-[#FFFFFF99]">
      <AlertDialogTitle className="flex flex-col items-center text-[20px] font-medium">
       <FingerprintPattern className="bg-[#DFA620] rounded-lg p-2 mb-2" size={55} />Admin Portal
       <p>Authorized Personnel Only</p>
      </AlertDialogTitle>
     </AlertDialogHeader>

     <div className="pt-0! p-6 [&_label]:block [&_label]:pb-2 [&_label]:text-sm">
      <label htmlFor="adminUsername">Administrator Username</label>
      <Input
       id="adminUsername"
       type="email"
       placeholder="Enter your Username"
       required
      />

      <label htmlFor="adminPass" className="pt-4">Administrator Password</label>
      <Input
       id="adminPass"
       type="password"
       placeholder="***************"
       required
      />
      <Button className="bg-[#D39A05] hover:bg-[#5E6E66] rounded-lg w-full py-3 uppercase mt-8 text-white cursor-pointer">Log in to dashboard</Button>
     </div>
    </AlertDialogContent>
   </AlertDialog>

  </>
 );
}