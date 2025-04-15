import Desserts from "./components/Desserts";
import DessertsHero from "./components/DessertsHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <DessertsHero />
      <Desserts />
      <NavSection />
    </main>
  );
}