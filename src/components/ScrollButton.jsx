import { useEffect, useState } from "react";
import { FiArrowUp } from "@react-icons/all-files/fi/FiArrowUp";
import { FiMessageSquare } from "@react-icons/all-files/fi/FiMessageSquare";
import ContactModal from "./ContactModal";



export default function ScrollToTopButton({ targetRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const [openContact, setOpenContact] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed  z-49 bottom-20 right-1 md:bottom-8 md:right-8 bg-[#dc6e1b]
          shadow-[0_0_10px_#ffbb66,0_0_20px_#ff9944] text-white p-3 rounded-full shadow-lg
          transition-opacity duration-300 hover:brightness-125   hover:shadow-[0_0_14px_#ffae42,0_0_28px_#ff7e2d] 
          ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </button>
      <button
        onClick={() => setOpenContact(true)}
        className={`hidden md:flex items-center gap-2 fixed  z-49 bottom-36 right-1 md:bottom-24
          md:right-8 bg-[#4F5D2F] shadow-[0_0_10px_#4F5D2F,0_0_20px_#7a9246] text-[#fefae8]
          p-3 rounded-full shadow-lg transition-opacity duration-300
          hover:shadow-[0_0_14px_#4F5D2F,0_0_28px_#9cbc60]
          hover:brightness-125 font-semibold tracking-wide ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Contact us"
      >
        <FiMessageSquare size={20} />
      </button>
      <ContactModal isOpen={openContact} onClose={() => setOpenContact(false)} />
    </>
  );
}
