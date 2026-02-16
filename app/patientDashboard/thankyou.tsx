import { CircleCheckBig, Clock4, CreditCard, File, Phone } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Thankyou({
  onBack,
  onHome,
}: {
  onBack: () => void;
  onHome: () => void;
}) {

  return (
    <>

      <div className="max-w-2xl px-3.75 mx-auto pt-7 [&_strong]:font-semibold">

        <div className="flex text-center flex-col items-center pb-5 [&_svg]:bg-[#CCD7C680] [&_svg]:rounded-full [&_svg]:p-3.5 [&_h2]:tracking-[1px] [&_h2]:font-semibold [&_h2]:text-[32px] [&_h2]:pt-2 [&_h2]:text-[#000000]">
          <CircleCheckBig size={75} color="#5E6E66" />
          <h2>Thank You!</h2>
          <p>Your consultation request has been submitted successfully.</p>
        </div>

        <div className="border border-[#D7DED3] shadow-[0px_1px_2px_0px_#0000000D] p-5 bg-white rounded-xl [&_p]:text-[#677E73] [&_p]:text-sm">
          <div className="flex items-center gap-3 pb-5">
            <CreditCard color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
            <strong>Order Details</strong>
          </div>

          <div className="flex justify-between items-center text-sm text-[#2B3B33]! [&_p]:text-[#2B3B33]! [&_p]:font-medium [&_span]:font-semibold">
            <p>Order Id</p>
            <span>RXR-ZIIFZ3</span>
          </div>

          <div className="bg-[#D7DED3] h-px mt-2"></div>

          <div className="flex justify-between items-center pt-4.5 text-sm">
            <p>Date</p>
            <span>December 8, 2025</span>
          </div>

          <div className="bg-[#D7DED3] h-px mt-2"></div>

          <div className="flex justify-between items-center pt-4.5 text-sm">
            <p>Service</p>
            <span>Urgent Care Consultation</span>
          </div>

          <div className="bg-[#D7DED3] h-px mt-2"></div>

          <div className="flex justify-between items-center pt-4.5 text-[18px] [&_span]:font-bold [&_span]:text-[#D39A05] [&_span:last-child]:text-[20px]">
            <strong>Total</strong>
            <span>$54.99</span>
          </div>

        </div>

        <div className="p-4 mt-3 rounded-xl bg-[#CCD7C680] [&_svg]:p-2 [&_svg]:rounded-lg [&_svg]:bg-[#CECFB6] [&>strong:first-child]:font-semibold! [&_strong]:font-medium! [&_p]:text-[15px] [&_p]:text-[#2B3B3399]">
          <strong>What Happen Next?</strong>
          <div className="flex items-center gap-3.5 pt-2">
            <Clock4 size={40} color="#D39A05" />
            <div>
              <strong>Provider Review</strong>
              <p>A licenses provider will review you case within 15-30 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 pt-2">
            <File size={40} color="#D39A05" />
            <div>
              <strong>Prescription Sent</strong>
              <p>A licenses provider will review you case within 15-30 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 pt-2">
            <Phone size={40} color="#D39A05" />
            <div>
              <strong>Follow Up</strong>
              <p>A licenses provider will review you case within 15-30 minutes</p>
            </div>
          </div>
        </div>

        <div className="text-center border border-[#D7DED3] p-5 mt-3 rounded-xl bg-white [&_strong]:font-normal! [&_p]:text-[#D39A05]">
          <strong>Question about your order?</strong>
          <p>Contact: <Link href="mailto:support@rxreleaf.com">support@rxreleaf.com</Link></p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-6 [&_Button]:py-6 [&_Button]:w-full [&_Button]:text-white [&_Button]:uppercase [&_Button]:cursor-pointer">
        <Button
  onClick={onBack}
  className="bg-[#5E6E66] hover:bg-[#D39A05]"
>
  Back to Checkout
</Button>

<Button
  onClick={onHome}
  className="bg-[#D39A05] hover:bg-[#5E6E66]"
>
  Back to Home
</Button>

        </div>

      </div>

    </>
  );
}