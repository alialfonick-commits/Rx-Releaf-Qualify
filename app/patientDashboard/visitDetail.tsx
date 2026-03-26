"use client"
import * as React from "react"
import { Input } from "../components/patientInputComp"
import { Calendar } from "../components/dobCalendarComp"
import { CalendarIcon } from "lucide-react"
import { Field } from "@/components/ui/field"
import { US_STATES } from "@/lib/constants/usStates";
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
import { useDispatch } from "react-redux"
import { setVisitDetails } from "@/store/visitSlice"
import { setPatientInfo } from "@/store/patientSlice"
import { useRouter } from "next/navigation"

type PharmacyPackage = {
  exam_pos_id: number
  order_set_id: number
  title: string
  pharmacy_id: number
  turnaround_time: string
  pharmacy_name: string
  integration_partner: number
  qualiphy_total_price: string
}

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

export default function VisitDetail() {

 const [open, setOpen] = React.useState(false)
 const [date, setDate] = React.useState<Date | undefined>(undefined)
 const [month, setMonth] = React.useState<Date | undefined>(new Date())
 const [value, setValue] = React.useState("")
 const [selectedState, setSelectedState] = React.useState("");
 const [exams, setExams] = React.useState([]);
 const [selectedExamId, setSelectedExamId] = React.useState("");
 const [pharmacyPackages, setPharmacyPackages] = React.useState<PharmacyPackage[]>([]);
 const [selectedPackage, setSelectedPackage] = React.useState("");
 const [selectedPackagePrice, setselectedPackagePrice] = React.useState("");
 const [firstName, setFirstName] = React.useState("")
 const [lastName, setLastName] = React.useState("")
 const [email, setEmail] = React.useState("")
 const [phone, setPhone] = React.useState("")
 const [birthSex, setBirthSex] = React.useState("")
 const [errors, setErrors] = React.useState<any>({});

 React.useEffect(() => {
  async function fetchExams() {
    const res = await fetch("/api/exams");
    const data = await res.json();
    console.log(data)
    // Adjust this depending on actual response shape
    setExams(data.exams || data);
  }

  fetchExams();
}, []);

// React.useEffect(() => {
//   if (!selectedState || !selectedExamId) return;

//   async function fetchPackages() {
//     try {
//       const res = await fetch("/api/pharmacy-packages", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           examId: Number(selectedExamId),
//           state: selectedState,
//         }),
//       });

//       const data = await res.json();
//       setPharmacyPackages(data.packages || data);
  
//     } catch (error) {
//       console.error("Failed to fetch pharmacy packages", error);
//     }
//   }

//   fetchPackages();
// }, [selectedState, selectedExamId]);

const dispatch = useDispatch()
const router = useRouter()

const handleNext = () => {
if (!validateForm()) return;

 dispatch(setVisitDetails({
  state: selectedState,
  examId: selectedExamId,
  packageId: selectedPackage,
  packagePrice: 89
 }))

 dispatch(setPatientInfo({
  firstName,
  lastName,
  email,
  phone,
  dob: value,
  birthSex
 }))

 router.push("/payment")
}

const validateForm = () => {
  let newErrors: any = {};

  if (!selectedState) newErrors.selectedState = "State is required";
  if (!selectedExamId) newErrors.selectedExamId = "Please select a treatment";

  if (!firstName.trim()) newErrors.firstName = "First name is required";
  if (!lastName.trim()) newErrors.lastName = "Last name is required";

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    newErrors.email = "Invalid email";
  }

  if (!phone.trim()) {
    newErrors.phone = "Phone is required";
  }

  if (!value) newErrors.dob = "Date of birth is required";

  if (!birthSex || birthSex === "bs") {
    newErrors.birthSex = "Select birth sex";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

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
       className="cursor-not-allowed"
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
      <Select
        value={selectedState}
        onValueChange={(value) => {
          setSelectedState(value);
          setErrors((prev: any) => ({ ...prev, selectedState: "" }));
        }}
        >
        <SelectTrigger id="form-Patient-State">
            <SelectValue placeholder="Select your state" />
        </SelectTrigger>

        <SelectContent>
          {US_STATES.map((state) => (
          <SelectItem key={state.value} value={state.value}>
            {state.label}
          </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.selectedState && (
        <p className="text-red-500 text-xs">{errors.selectedState}</p>
      )}
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
       className="cursor-not-allowed"
       type="text"
       placeholder="Urgent Care Visit: Consultation + Prescription  sent to your.."
       readOnly
       required
      />
     </div>

     <div className="overflow-hidden">
      <label htmlFor="form-visit" className="sm:whitespace-nowrap flex overflow-hidden">Urgent Care Visit: Consultation + Prescription  sent to your..</label>
      <Select
        value={selectedExamId}
        onValueChange={(value) => {
          setSelectedExamId(value);
          setErrors((prev: any) => ({ ...prev, selectedExamId: "" }));
          console.log("Selected Exam ID:", value);
        }}
      >
        <SelectTrigger className="whitespace-nowrap">
          <SelectValue placeholder="Select treatment" />
        </SelectTrigger>

        <SelectContent className='sm:max-w-108.75 max-w-80'>
          {exams.map((exam: any) => (
            <SelectItem key={exam.id} value={exam.id}>
              {exam.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.selectedExamId && (
        <p className="text-red-500 text-xs">{errors.selectedExamId}</p>
      )}
     </div>

     <div>
      <label htmlFor="form-package">Pharmacy Package</label>
      <Select
        disabled
      >
        <SelectTrigger id="form-package">
          <SelectValue placeholder="Provider Selects (Best Price)" />
        </SelectTrigger>

        <SelectContent>
        </SelectContent>
      </Select>
      {/* <Select
        value={selectedPackage}
        onValueChange={(value) => {
          setSelectedPackage(value);
          const selected = pharmacyPackages.find(
            (pkg: any) => String(pkg.exam_pos_id) === value
          )
      
          if (selected) {
            setselectedPackagePrice(selected.qualiphy_total_price)
          }
      
          console.log("Selected Pharmacy Package:", value)
        }}
        disabled={!selectedState || !selectedExamId}
      >
        <SelectTrigger id="form-package">
          <SelectValue placeholder="Select pharmacy package" />
        </SelectTrigger>

        <SelectContent>
          {pharmacyPackages.map((pkg: any) => (
            <SelectItem
              key={pkg.exam_pos_id}
              value={String(pkg.exam_pos_id)}
            >
              {pkg.title} - ${pkg.qualiphy_total_price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
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
       onChange={(e) => {
        setFirstName(e.target.value)
        setErrors((prev: any) => ({ ...prev, firstName: "" }));
       }}
       required
      />
      {errors.firstName && (
        <p className="text-red-500 text-xs">{errors.firstName}</p>
      )}
     </div>

     <div>
      <label htmlFor="last-name">Last Name</label>
      <Input
       id="last-name"
       type="text"
       placeholder="Enter last name"
       onChange={(e) => {
        setLastName(e.target.value)
        setErrors((prev: any) => ({ ...prev, lastName: "" }));
       }}
       required
      />
      {errors.lastName && (
        <p className="text-red-500 text-xs">{errors.lastName}</p>
      )}
     </div>

     <div>
      <label htmlFor="email">Email</label>
      <Input
       id="email"
       type="text"
       placeholder="you@example.com"
       onChange={(e) => {
        setEmail(e.target.value)
        setErrors((prev: any) => ({ ...prev, email: "" }));
      }}
       required
      />
      {errors.email && (
        <p className="text-red-500 text-xs">{errors.email}</p>
      )}
     </div>

     <div>
      <label htmlFor="phone">Phone Number</label>
      <Input
       id="phone"
       maxLength={20}
       type="text"
       placeholder="(555) 123-4567"
       onChange={(e) => {
        setPhone(e.target.value)
        setErrors((prev: any) => ({ ...prev, phone: "" }));
      }}
      required
      />
      {errors.phone && (
        <p className="text-red-500 text-xs">{errors.phone}</p>
      )}
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
             setErrors((prev: any) => ({ ...prev, dob: "" }));
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
      {errors.dob && (
        <p className="text-red-500 text-xs">{errors.dob}</p>
      )}
     </div>

     <div>
      <label htmlFor="birth-sex">Birth Sex</label>
      <Select defaultValue="bs" 
        value={birthSex} 
        onValueChange={(value) => {
          setBirthSex(value)
          setErrors((prev: any) => ({ ...prev, birthSex: "" }));
        }}>
       <SelectTrigger id="birth-sex">
        <SelectValue placeholder="Gender" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="bs">Select birth sex</SelectItem>
        <SelectItem value="men">Men</SelectItem>
        <SelectItem value="women">Women</SelectItem>
        <SelectItem value="custom">Custom</SelectItem>
       </SelectContent>
      </Select>
      {errors.birthSex && (
        <p className="text-red-500 text-xs">{errors.birthSex}</p>
     )}
     </div>
    </div>

    <div className="max-w-104 mx-auto w-full pt-6 [&_Button]:py-6 [&_Button]:w-full [&_Button]:text-white [&_Button]:cursor-pointer [&_button]:uppercase">
     <Button
      onClick={handleNext}
      className="bg-[#D39A05] hover:bg-[#5E6E66]"
     >
      Next
     </Button>
    </div>


   </div>

  </>
 )
}