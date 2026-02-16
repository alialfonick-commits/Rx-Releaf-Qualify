"use client"
import * as React from "react"
import { Input } from "../components/patientInputComp"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Field } from "@/components/ui/field"
import {
 InputGroup,
 InputGroupAddon,
 InputGroupButton,
 InputGroupInput,
} from "../components/dobInputComp"
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "../components/dobPopoverComp"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../components/patientSelectComp"
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../components/formTooltip"
import { Info, Stethoscope, User } from "lucide-react"
import { Button } from "@/components/ui/button"


function formatDate(date: Date | undefined) {
 if (!date) {
  return ""
 }

 return date.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
 })
}

function isValidDate(date: Date | undefined) {
 if (!date) {
  return false
 }
 return !isNaN(date.getTime())
}

export default function VisitDetail({
 onNext,
}: {
 onNext: () => void;
}) {

 const [open, setOpen] = React.useState(false)
 const [date, setDate] = React.useState<Date | undefined>(undefined)
 const [month, setMonth] = React.useState<Date | undefined>(new Date())
 const [value, setValue] = React.useState("")
 

 return (
  <>

   <div className="bg-[#FFFFFF] border border-[#D7DED3] rounded-xl sm:p-6 p-4 [&_strong]:font-semibold [&_strong]:text-[20px] [&_strong]:text-[#2B3B33] [&_label]:font-medium">
    <div className="flex items-center gap-3 pb-5">
     <Stethoscope color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
     <strong>Visit Details</strong>
    </div>


    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 [&_label]:text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-2">

     <div>
      <div className="flex items-center gap-2">
       <label htmlFor="form-clinic">Clinic</label>
       <TooltipProvider>
        <Tooltip>
         <TooltipTrigger asChild>
          <Info color="#2B3B33" className="h-4 w-4 cursor-pointer" />
         </TooltipTrigger>
         <TooltipContent>
          <p>Enter your full legal name</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>
      </div>
      <Input
       id="form-clinic"
       type="text"
       placeholder="Rx Releaf"
       readOnly
       required
      />
     </div>

     <div>
      <div className="flex items-center gap-2">
       <label htmlFor="form-Patient-State">Patient State</label>
       <TooltipProvider>
        <Tooltip>
         <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
         </TooltipTrigger>
         <TooltipContent className="">
          <p>Enter your full legal name</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>
      </div>
      <Select defaultValue="selectState">
       <SelectTrigger id="form-Patient-State">
        <SelectValue />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="selectState">Select your state</SelectItem>
        <SelectItem value="cl">Critical</SelectItem>
        <SelectItem value="nl">Normal</SelectItem>
       </SelectContent>
      </Select>
     </div>

     <div>
      <div className="flex items-center gap-2">
       <label htmlFor="form-type">Consultation Type</label>
       <TooltipProvider>
        <Tooltip>
         <TooltipTrigger asChild>
          <Info color="#2B3B33" className="h-4 w-4 cursor-pointer" />
         </TooltipTrigger>
         <TooltipContent>
          <p>Enter your full legal name</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>
      </div>
      <Input
       id="form-type"
       type="text"
       placeholder="Urgent Care Visit: Consultation + Prescription  sent to your.."
       readOnly
       required
      />
     </div>

     <div>
      <label htmlFor="form-visit" className="sm:whitespace-nowrap flex overflow-hidden">Urgent Care Visit: Consultation + Prescription  sent to your..</label>
      <Select defaultValue="selectState">
       <SelectTrigger id="form-visit">
        <SelectValue />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="selectState">Select your state</SelectItem>
        <SelectItem value="cl">Critical</SelectItem>
        <SelectItem value="nl">Normal</SelectItem>
       </SelectContent>
      </Select>
     </div>

     <div>
      <label htmlFor="form-package">Pharmacy Package</label>
      <Select defaultValue="us">
       <SelectTrigger id="form-package">
        <SelectValue />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="us">Provider Selects</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
       </SelectContent>
      </Select>
     </div>

    </div>


   </div>

   <div className="bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4 mt-2 [&_strong]:font-semibold [&_strong]:text-[20px]">
    <div className="flex items-center gap-3 pb-5">
     <User color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
     <strong>Patient Information</strong>
    </div>


    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 [&_label]:font-medium [&_label]:text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-2">

     <div>
      <label htmlFor="first-name">First Name</label>
      <Input
       id="first-name"
       type="text"
       placeholder="Enter first name"
       required
      />
     </div>

     <div>
      <label htmlFor="last-name">Last Name</label>
      <Input
       id="last-name"
       type="text"
       placeholder="Enter last name"
       required
      />
     </div>

     <div>
      <label htmlFor="email">Email</label>
      <Input
       id="email"
       type="text"
       placeholder="you@example.com"
       required
      />
     </div>

     <div>
      <label htmlFor="phone">Phone Number</label>
      <Input
       id="phone"
       type="text"
       placeholder="(555) 123-4567"
       required
      />
     </div>

     <div>
      <Field>
       <label htmlFor="dob">Date of Birth</label>
       <InputGroup>
        <InputGroupInput
         id="date-required"
         value={value}
         placeholder="MM/DD/YYY"
         onChange={(e) => {
          const date = new Date(e.target.value)
          setValue(e.target.value)
          if (isValidDate(date)) {
           setDate(date)
           setMonth(date)
          }
         }}
         onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
           e.preventDefault()
           setOpen(true)
          }
         }}
        />
        <InputGroupAddon align="inline-end">
         <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
           <InputGroupButton
            id="date-picker"
            variant="ghost"
            size="icon-xs"
            aria-label="Select date"
           >
            <CalendarIcon />
            <span className="sr-only">Select date</span>
           </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent
           className="w-auto overflow-hidden p-0"
           align="end"
           alignOffset={-8}
           sideOffset={10}
          >
           <Calendar
            mode="single"
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
             setDate(date)
             setValue(formatDate(date))
             setOpen(false)
            }}
           />
          </PopoverContent>
         </Popover>
        </InputGroupAddon>
       </InputGroup>
      </Field>
     </div>

     <div>
      <label htmlFor="birth-sex">Birth Sex</label>
      <Select defaultValue="bs">
       <SelectTrigger id="birth-sex">
        <SelectValue />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="bs">Select birth sex</SelectItem>
        <SelectItem value="men">Men</SelectItem>
        <SelectItem value="women">Women</SelectItem>
        <SelectItem value="custom">Custom</SelectItem>
       </SelectContent>
      </Select>
     </div>

    </div>

    <div className="grid grid-cols-2 gap-2 max-w-104 mx-auto w-full pt-6 [&_Button]:py-6 [&_Button]:w-full [&_Button]:text-white [&_Button]:cursor-pointer [&_button]:uppercase">
     <Button className="bg-[#5E6E66] hover:bg-[#D39A05]">Back</Button>
     <Button
      onClick={onNext}
      className="bg-[#D39A05] hover:bg-[#5E6E66]"
     >
      Next
     </Button>
    </div>


   </div>

  </>
 )
}