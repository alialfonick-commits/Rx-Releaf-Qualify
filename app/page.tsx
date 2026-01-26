// import WelcomeBar from "./components/welcomeBar"
// import VisitDetail  from "./components/visitDetail"
import ResentCases from "./components/recentCases";
import { RecentVisit } from "./components/recentVisit";
import Stats from "./components/stats";
import VisitRequest from "./components/visitRequest";


export default function Home() {
  return (
    <>

      {/* <WelcomeBar /> */}
      {/* <VisitDetail  /> */}
      <VisitRequest />
      <Stats />
      <ResentCases />
      <RecentVisit />
    </>
  );
}
