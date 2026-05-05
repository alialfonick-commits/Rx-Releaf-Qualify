"use client"
import * as React from "react"
import { Input } from "../../../components/patientInputComp"
import { Calendar } from "../../../components/dobCalendarComp"
import { CalendarIcon } from "lucide-react"
import { Field } from "@/components/ui/field"
import { US_STATES } from "@/lib/constants/usStates";
import {
 InputGroup,
 InputGroupAddon,
 InputGroupButton,
 InputGroupInput,
} from "../../../components/dobInputComp"
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "../../../components/dobPopoverComp"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../../../components/patientSelectComp"
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "../../../components/formTooltip"
import { Info, Stethoscope, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { setVisitDetails } from "@/store/visitSlice"
import { setPatientInfo } from "@/store/patientSlice"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

type ConsultationOption = {
  id: string
  qualiphyExamId: number
  title: string
  rxType: number | null
}

type ConsultationTypeConfig = {
  id: string
  typeKey: string
  label: string
  options: ConsultationOption[]
}

type FormErrors = Partial<Record<
  | "selectedState"
  | "selectedConsultationTypeId"
  | "selectedExamId"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "dob"
  | "birthSex",
  string
>>

export default function VisitDetail({ mode = "public" }: { mode?: "public" | "staff" }) {

 const [open, setOpen] = React.useState(false)
 const [date, setDate] = React.useState<Date | undefined>()
 const [selectedState, setSelectedState] = React.useState("");
  const [consultationTypes, setConsultationTypes] = React.useState<ConsultationTypeConfig[]>([]);
  const [selectedConsultationTypeId, setSelectedConsultationTypeId] = React.useState("");
  const [selectedExamId, setSelectedExamId] = React.useState("");
  const selectedPackage = "";
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [birthSex, setBirthSex] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({});

  const selectedConsultationType = consultationTypes.find(
    (type) => type.id === selectedConsultationTypeId
  );
  const selectedExam = selectedConsultationType?.options.find(
    (option) => String(option.qualiphyExamId) === selectedExamId
  );

 React.useEffect(() => {
  async function fetchExams() {
    const res = await fetch("/api/exams");
    const data = await res.json();
    setConsultationTypes(data.consultationTypes || []);
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
  consultationType: selectedConsultationType?.typeKey || "",
  consultationTypeLabel: selectedConsultationType?.label || "",
  examId: selectedExamId,
  examName: selectedExam?.title || "",
  packageId: selectedPackage,
  packagePrice: 89
 }))

 dispatch(setPatientInfo({
  firstName,
  lastName,
  email,
  phone,
  dob: date ? format(date, "MM/dd/yyyy") : "",
  birthSex
 }))

  if (mode === "public") {
    router.push("/payment")
  }

  if (mode === "staff") {
    createExamForStaff()
  }
}

const createExamForStaff = async () => {
  try {
    const res = await fetch("/api/staff/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        visit: {
          state: selectedState,
          examId: selectedExamId,
          consultationType: selectedConsultationType?.typeKey,
          examName: selectedExam?.title
        },
        patient: {
          firstName,
          lastName,
          email,
          phone,
          dob: date,
          birthSex
        }
      })
    })

    const data = await res.json()

    if (data.success) {
      alert("Exam created successfully")
      router.push("/staff/visits")
    } else {
      alert("Failed to create exam")
    }

  } catch (err) {
    console.error(err)
  }
}

const validateForm = () => {
  const newErrors: FormErrors = {};

  if (!selectedState) newErrors.selectedState = "State is required";
  if (!selectedConsultationTypeId) newErrors.selectedConsultationTypeId = "Consultation type is required";
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

  if (!date) newErrors.dob = "Date of birth is required";

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
          <p>Clinic</p>
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
          <p>Select Patient State</p>
         </TooltipContent>
        </Tooltip>
       </TooltipProvider>
      </div>
      <Select
        value={selectedState}
        onValueChange={(value) => {
          setSelectedState(value);
          setErrors((prev) => ({ ...prev, selectedState: "" }));
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
          <p>Consultation Type</p>
         </TooltipContent>
        </Tooltip>
        </TooltipProvider>
       </div>
       <Select
         value={selectedConsultationTypeId}
         onValueChange={(value) => {
           setSelectedConsultationTypeId(value);
           setSelectedExamId("");
           setErrors((prev) => ({ ...prev, selectedConsultationTypeId: "", selectedExamId: "" }));
         }}
       >
        <SelectTrigger id="form-type">
          <SelectValue placeholder="Select consultation type" />
        </SelectTrigger>

        <SelectContent className='sm:max-w-108.75 max-w-80'>
          {consultationTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
       </Select>
       {errors.selectedConsultationTypeId && (
        <p className="text-red-500 text-xs">{errors.selectedConsultationTypeId}</p>
       )}
      </div>

      <div className="overflow-hidden">
       <label htmlFor="form-visit" className="sm:whitespace-nowrap flex overflow-hidden">
        {selectedConsultationType?.label || "Consultation Option"}
       </label>
       <Select
         value={selectedExamId}
         onValueChange={(value) => {
          setSelectedExamId(value);
          setErrors((prev) => ({ ...prev, selectedExamId: "" }));
          // console.log("Selected Exam ID:", value);
         }}
         disabled={!selectedConsultationTypeId}
       >
         <SelectTrigger className="whitespace-nowrap">
           <SelectValue placeholder={selectedConsultationTypeId ? "Select option" : "Select consultation type first"} />
         </SelectTrigger>

         <SelectContent className='sm:max-w-108.75 max-w-80'>
           {selectedConsultationType?.options.map((exam) => (
            <SelectItem key={exam.id} value={String(exam.qualiphyExamId)}>
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
         setErrors((prev) => ({ ...prev, firstName: "" }));
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
         setErrors((prev) => ({ ...prev, lastName: "" }));
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
         setErrors((prev) => ({ ...prev, email: "" }));
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
         setErrors((prev) => ({ ...prev, phone: "" }));
      }}
      required
      />
      {errors.phone && (
        <p className="text-red-500 text-xs">{errors.phone}</p>
      )}
     </div>

     <div>
        <Field>
        <label htmlFor='dob'>Date of Birth</label>

        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
            {/* <button type="button" className="w-full text-left"> */}
              <div className="w-full text-left cursor-pointer">
                <InputGroup>
                <InputGroupInput
                    id='date-required'
                    value={date ? format(date, "MM/dd/yyyy") : ""}
                    placeholder='MM/DD/YYYY'
                    readOnly
                />
                <InputGroupAddon align='inline-end'>
                    <InputGroupButton variant='ghost' size='icon-xs'>
                    <CalendarIcon />
                    </InputGroupButton>
                </InputGroupAddon>
                </InputGroup>
              </div>
            {/* </button> */}
            </PopoverTrigger>

            <PopoverContent
            className='w-auto p-0 z-50'
            align='end'
            sideOffset={10}
            onInteractOutside={(e) => {
                const target = e.target as HTMLElement
                if (target.closest('[data-radix-select-content]')) {
                e.preventDefault()
                }
            }}
            onPointerDownOutside={(e) => {
                const target = e.target as HTMLElement
                if (target.closest('[data-radix-select-content]')) {
                e.preventDefault()
                }
            }}
            >
            <Calendar
                mode='single'
                selected={date}
                onSelect={(selectedDate) => {
                setDate(selectedDate)
                setOpen(false)
                }}
                captionLayout="dropdown"
            />
            </PopoverContent>
        </Popover>
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
          setErrors((prev) => ({ ...prev, birthSex: "" }));
        }}>
       <SelectTrigger id="birth-sex">
        <SelectValue placeholder="Gender" />
       </SelectTrigger>
       <SelectContent>
        <SelectItem value="bs">Select birth sex</SelectItem>
        <SelectItem value="MALE">Men</SelectItem>
        <SelectItem value="FEMALE">Women</SelectItem>
        <SelectItem value="custom">Custom</SelectItem>
       </SelectContent>
      </Select>
      {errors.birthSex && (
        <p className="text-red-500 text-xs">{errors.birthSex}</p>
     )}
     </div>
    </div>

    <div className="max-w-55 mx-auto w-full pt-6 [&_Button]:py-6 [&_Button]:w-full [&_Button]:text-white [&_Button]:cursor-pointer [&_button]:uppercase">
     <Button
      onClick={handleNext}
      className="bg-[#D39A05] hover:bg-[#708E86]"
     >
      Next
     </Button>
    </div>


   </div>

  </>
 )
}
