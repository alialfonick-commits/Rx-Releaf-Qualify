import Navbar from "../components/navbar";
import SideBar from "../components/sidebar/sideBar";

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#6B7C72] relative">
      <SideBar />
      <div className="bg-[#F6F7F2] px-4 py-2 shadow-[1px_0px_10px_4px_#00000021] w-full">
        {children}
      </div>
    </div>
  );
}