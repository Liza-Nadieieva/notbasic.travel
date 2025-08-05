import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import content from "../content";
import { FiMap } from "@react-icons/all-files/fi/FiMap";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { FiHome as FiHouse } from "@react-icons/all-files/fi/FiHome";
import { FiDollarSign } from "@react-icons/all-files/fi/FiDollarSign";
import { FiMessageCircle } from "@react-icons/all-files/fi/FiMessageCircle";
import ContactModal from "./ContactModal";

export default function MobileNav({refs}) {
  const [openContact, setOpenContact] = useState(false);
  
  const { lang } = useLanguage();
  const t = content[lang].nav;

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#fff8f0] border-t border-[#e0d7ce] z-49 md:hidden">
      <div className="flex justify-around items-center h-16 text-xs">
        <button onClick={() => scrollTo(refs.program)} className="flex flex-col items-center text-[#533d2e] hover:text-[#dc6e1b] transition-colors duration-200">
          <FiMap size={20} />
          <span className="mt-1">{t.program}</span>
        </button>
        <button onClick={() => scrollTo(refs.mentors)} className="flex flex-col items-center text-[#533d2e] hover:text-[#dc6e1b] transition-colors duration-200">
          <FiUsers size={20} />
          <span className="mt-1">{t.mentors}</span>
        </button>
        <button onClick={() => scrollTo(refs.accommodation)} className="flex flex-col items-center text-[#533d2e] hover:text-[#dc6e1b] transition-colors duration-200">
          <FiHouse size={20} />
          <span className="mt-1">{t.accommodation}</span>
        </button>
        <button onClick={() => scrollTo(refs.price)} className="flex flex-col items-center text-[#533d2e] hover:text-[#dc6e1b] transition-colors duration-200">
          <FiDollarSign size={20} />
          <span className="mt-1">{t.price}</span>
        </button>
        <button onClick={() => setOpenContact(true)} className="flex flex-col items-center text-[#533d2e] hover:text-[#dc6e1b] transition-colors duration-200">
          <FiMessageCircle size={20} />
          <span className="mt-1">{t.contact}</span>
        </button>
        <ContactModal isOpen={openContact} onClose={() => setOpenContact(false)} />
      </div>
    </nav>
  );
}
