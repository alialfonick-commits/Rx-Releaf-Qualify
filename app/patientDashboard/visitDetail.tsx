import { Input } from "../components/patientInputComp"
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


export default function VisitDetail() {
  return (
    <>
      <div className="bg-[#FFFFFF] border border-[#D7DED3] rounded-xl p-6 [&_strong]:font-semibold [&_strong]:text-[20px] [&_strong]:text-[#2B3B33]">
        <div className="flex items-center gap-3 pb-5">
          <Stethoscope color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
          <strong>Visit Details</strong>
        </div>


        <div className="grid grid-cols-3 gap-4 space-y-4  [&_label]:text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-2">

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
            <label htmlFor="form-visit">Urgent Care Visit: Consultation + Prescription  sent to your..</label>
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

      <div className="bg-[#FFFFFF] border border-[#D7DED3] rounded-xl p-6 mt-2 [&_strong]:font-semibold [&_strong]:text-[20px] [&_strong]:text-[#2B3B33]">
        <div className="flex items-center gap-3 pb-5">
          <User color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
          <strong>Patient Information</strong>
        </div>


        <div className="grid grid-cols-3 gap-4 space-y-4  [&_label]:text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-2">

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


      </div>

    </>
  )
}