import AboutPage from "@/components/About";
import HeroBanner from "@/components/Banner";
import ContactPage from "@/components/Contact";
import FAQPage from "@/components/Faq";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans ">
       <HeroBanner></HeroBanner>
       <AboutPage></AboutPage>
       <WhyChooseUs></WhyChooseUs>
       <FAQPage></FAQPage>
       <ContactPage></ContactPage>
    </div>
  );
}
