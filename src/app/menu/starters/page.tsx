import Starters from "./components/Starters";
import StartersHero from "./components/StartersHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <StartersHero />
      <Starters />
      <NavSection />
    </main>
  );
}