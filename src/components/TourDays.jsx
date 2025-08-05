import { useLanguage } from "../LanguageContext.jsx";
import { useState } from "react";
import SocialLinks from "./SocialLinks.jsx";
import content from "../content.jsx";
import { motion, AnimatePresence } from "framer-motion";
import DayModal from "./DayModal";

const images = [
  "/explore.jpg",
  "/palma.jpg",
  "/boat.jpg",
  "/soler.jpg",
  "/beach.jpeg"
];

export default function TourDays({ refs }) {
  const { lang } = useLanguage();
  const itinerary = content[lang].itinerarySection;
  const t = content[lang].nav;
  const days = itinerary.days;
  const [selectedDay, setSelectedDay] = useState(null);

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease:[0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section className="bg-sand py-1 px-4">
      <div className="flex justify-between w-full px-6 md:px-12">
        <div className="hidden md:flex gap-6 text-[#4F5D2F] text-lg font-inter mt-10 cursor-pointer">
          <a onClick={() => scrollTo(refs.program)} className="hover:text-[#dc6e1b]">{t.program}&emsp;|</a>
          <a onClick={() => scrollTo(refs.mentors)} className="hover:text-[#dc6e1b]">{t.mentors}&emsp;|</a>
          <a onClick={() => scrollTo(refs.accommodation)} className="hover:text-[#dc6e1b]">{t.accommodation}&emsp;|</a>
          <a onClick={() => scrollTo(refs.price)} className="hover:text-[#dc6e1b]">{t.price}</a>
        </div>
        <div className="w-full flex justify-center md:justify-end mt-4 md:mt-1 md:mr-[120px]">
          <div className="flex flex-col items-center text-center font-secondary">
            <span className="text-lg md:text-xl font-cormorant opacity-90 mb-2 tracking-wide drop-shadow-sm text-[#4F5D2F]">
              {itinerary.follow}
            </span>
            <SocialLinks />
          </div>
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-cormorant font-bold uppercase tracking-widest text-center mb-10 mt-4 text-[#533d2e]">
        {itinerary.title}
      </h2>

      <div 
        className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto mb-10 flex-wrap px-4 md:px-0"
        

      >
        {days.map((day, i) => {
          const fullDay = { ...day, index: i }; 
          return (
            <motion.div
              key={`day-${i}`}
              className="group h-[500px] md:h-[520px] w-[98%] md:w-[320px] cursor-pointer rounded-3xl transition-all duration-300 hover:shadow-[0_0_20px_6px_rgba(255,126,95,0.5),0_0_30px_12px_rgba(255,184,140,0.3)]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              onClick={() => setSelectedDay(fullDay)}
            >
              <img
                src={images[i]}
                alt={day.intro}
                className="rounded-2xl w-full h-[75%] object-cover"
                loading="lazy"
              />
              <div className="bg-transperent/50 backdrop-blur-lg rounded-b-3xl p-6 md:p-7 h-[25%] flex flex-col justify-center text-center">
                <span className="block text-lg font-bold text-[#533d2e] mb-1">
                  {day.dayLabel}
                </span>
                <span className="block text-xl font-cormorant font-bold text-[#533d2e] mb-1">
                  {day.intro}
                </span>
                <span className="block text-base font-cormorant text-[#846d53]">
                  {day.short}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedDay && (
          <DayModal
            isOpen={selectedDay !== null}
            onClose={() => setSelectedDay(null)}
            day={selectedDay}
            setDay={setSelectedDay}
            allDays={days.map((d, i) => ({ ...d, index: i }))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
