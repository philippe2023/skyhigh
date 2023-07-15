import Link from "next/link";
import Header from "./components/header/header";
import EmptyLegs from "./components/flight/emptyLegs";
import ProposedJet from "./components/flight/proposedJet";
import Join from "./components/join/join";
import Info from "./components/info/info";

export default function Home() {
  return (
    <div>
      <Header />
      <EmptyLegs />
      <ProposedJet />
      <Join />
      <Info />
    </div>
  );
}
