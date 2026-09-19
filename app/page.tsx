import Hero from "./components/sections/home/Hero";
import Overview from "./components/sections/home/Overview";
import PracticeVerticals from "./components/sections/home/PracticeVerticals";
import PreFooterContact from "./components/sections/home/PreFooterContact";
import ServicesSplit from "./components/sections/home/ServicesSplit";
import WhyUs from "./components/sections/home/WhyUs";


export default function Home() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Hero/>
      <Overview/>
      <PracticeVerticals/>
      <WhyUs/>
      <ServicesSplit/>
      <PreFooterContact/>
    </main>
  );
}