"use client"
import * as React from "react"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../components/patientSelectComp"
import { Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "../components/clinicalIntakeTextareaComp"

export default function VirtualStep2({
 onBack,
 onNext,
}: {
 onBack: () => void;
 onNext: () => void;
}) {


 return (
  <>
   <div className="max-w-174 w-full mx-auto">
    <div className="bg-[#FFFFFF] border border-[#D7DED3] rounded-xl p-4 [&_strong]:font-semibold [&_strong]:text-[20px] [&_strong]:text-[#2B3B33]">
     <div className="flex items-center gap-3 pb-3">
      <Stethoscope color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
      <strong>Clinical Intake</strong>
     </div>
     <p className="text-[#6A7C73] pb-2 text-[15px]">Please answer the following clinical questions to help us cordinate your visit.</p>

     <div className="space-y-4 [&_label]:font-medium [&_label]:text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-2">

      <div>
       <label htmlFor="form-Reason">What is the primary reason for this visit? *</label>
       <Select defaultValue="selectReason">
        <SelectTrigger id="form-reason">
         <SelectValue />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="selectReason">Select primary reason</SelectItem>
         <SelectItem value="cl">Critical</SelectItem>
         <SelectItem value="nl">Normal</SelectItem>
        </SelectContent>
       </Select>
      </div>

      <div>
       <label htmlFor="form-allergy">Do you have any known allergies?</label>
       <Select defaultValue="selectAllergy">
        <SelectTrigger id="form-allergy">
         <SelectValue />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="selectAllergy">Select options</SelectItem>
         <SelectItem value="cl">Critical</SelectItem>
         <SelectItem value="nl">Normal</SelectItem>
        </SelectContent>
       </Select>
      </div>

      <div>
       <label htmlFor="form-medicine">Are you currently taking any medications? *</label>
       <Select defaultValue="selectMedicine">
        <SelectTrigger id="form-medicine">
         <SelectValue />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="selectMedicine">Select options</SelectItem>
         <SelectItem value="cl">Critical</SelectItem>
         <SelectItem value="nl">Normal</SelectItem>
        </SelectContent>
       </Select>
      </div>

      <div>
       <label htmlFor="form-condition">Any previous medical conditions we should be aware of?</label>
       <Select defaultValue="selectCondition">
        <SelectTrigger id="form-condition">
         <SelectValue />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="selectCondition">List any relevant conditions</SelectItem>
         <SelectItem value="cl">Critical</SelectItem>
         <SelectItem value="nl">Normal</SelectItem>
        </SelectContent>
       </Select>
      </div>

      <div>
       <label htmlFor="form-notes">Additional notes or concerns</label>
       <Textarea placeholder="Please share any additional information that may help with your visit coordination..." required/>
      </div>

     </div>


    </div>

    <div className="bg-[#E8EDEA] border border-[#D7DED3] py-4 px-5 rounded-lg mt-3 [&_p]:inline text-sm">
     <strong>What happens next: </strong><p>We are coordinating your visit. A provider will review this request and you&apos;ll recieve confirmation once accepted. Next steps coming shortly</p>
    </div>

    <div className="flex justify-between gap-2 pt-5 sm:[&_Button]:px-18 [&_Button]:px-12 [&_Button]:py-6 [&_Button]:w-fit [&_Button]:cursor-pointer [&_button]:uppercase">
     <Button onClick={onBack} className="border-2 border-[#5E6E66] hover:bg-[#D39A05] hover:border-[#D39A05] hover:text-white text-[#5E6E66]">Back</Button>
     <Button
      onClick={onNext}
      className="border-2 border-[#D39A05] bg-[#D39A05] hover:border-[#5E6E66] hover:bg-transparent text-white hover:text-[#5E6E66]"
     >
      Next
     </Button>
    </div>

   </div>


  </>
 )
}