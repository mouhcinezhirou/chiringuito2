import Sushi from "./components/Sushi";
import SushiHero from "./components/SushiHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <SushiHero />
      <Sushi />
      <NavSection />
    </main>
  );
}