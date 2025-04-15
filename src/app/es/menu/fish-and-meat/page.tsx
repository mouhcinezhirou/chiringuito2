import Fishandmeat from "./components/Fishandmeat";
import Fishandmeathero from "./components/Fishandmeathero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <Fishandmeathero />
      <Fishandmeat />
      <NavSection />
    </main>
  );
}