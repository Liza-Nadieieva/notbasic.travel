import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext.jsx";
import content from "../content.jsx";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";

export default function IntroBlock({ setVideoLoaded }) {
  const { lang, toggleLang } = useLanguage();
  const text = content[lang];

  const [useFallback, setUseFallback] = useState(false);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const videoRef = useRef(null);
  const loaded = useRef(false);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.5,
        duration: 1.8,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  useEffect(() => {
    const tryPlay = async () => {
      try {
        await videoRef.current?.play();
      } catch (err) {
        console.warn("Video autoplay blocked, showing fallback image.", err);
        setUseFallback(true);
      }
    };

    tryPlay();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded.current) {
        setUseFallback(true);
        if (videoRef.current) {
          videoRef.current.src = "";
          videoRef.current.load();
        }
        setVideoLoaded(true);
      }
    }, 5000);

    const handleLoaded = () => {
      if (!loaded.current) {
        loaded.current = true;
        clearTimeout(timer);
        setVideoLoaded(true);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadeddata", handleLoaded);
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoaded);
      }
      clearTimeout(timer);
    };
  }, [setVideoLoaded]);

  return (
    <div className="relative w-full h-[73vh] md:h-[80vh] overflow-hidden">
      {!fallbackLoaded && (
        <img
          src="/placeholder.webp"
          alt="Placeholder"
          className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
        />
      )}

      {useFallback ? (
        <img
          src="/fallback2.jpg"
          alt="Mallorca fallback"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            fallbackLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setFallbackLoaded(true)}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/5.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

      <div className="absolute top-6 right-4 xs:right-12 sm:right-14 md:right-16 lg:right-22 z-20">
        <button
          onClick={toggleLang}
          className="uppercase bg-transparent border-none text-white text-base sxx:text-sm lg:text-base xl:text-lg tracking-widest cursor-pointer transition hover:animate-pulse px-2 py-1"
        >
          {lang === "ru" ? "UKR" : "RU"}
        </button>
      </div>

      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.h1
          className="font-cormorant text-8xl sxx:text-xl xs:text-5xl mid:text-5.5xl ml:text-6xl sm:text-7xl lg:text-8xl xl:text-7.5xl font-bold tracking-wider uppercase"
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={0}
        >
          {text.title1}
          <br />
          {text.title2}
        </motion.h1>
        <motion.p
          className="text-xl sxx:text-sm xs:text-base lg:text-xl mt-3 mb-6 font-light font-sans"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={variants}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          {text.description}
        </motion.p>
        <motion.button
          className="px-6 mt-8 sxx:px-4 sxx:py-2 xs:px-6 xs:py-3 text-sm sm:text-base md:text-lg py-3 bg-white/20 backdrop-blur-md text-white border border-white rounded-md hover:bg-sand hover:text-black hover:border-sand transition btn-contact"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={variants}
          onClick={() => setOpenContact(true)}
        >
          {text.buttonText}
        </motion.button>
      </div>

      <ContactModal isOpen={openContact} onClose={() => setOpenContact(false)} />
    </div>
  );
}

