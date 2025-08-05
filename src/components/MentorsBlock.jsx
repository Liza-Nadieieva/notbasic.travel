import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext.jsx";
import content from "../content.jsx";
import MentorCard from "./MentorCard.jsx";

import { motion, useInView } from "framer-motion";


export default function MentorsBlock() {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const { title, mentors, why } = content[lang].mentorsSection;
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });  
  const firstColumn = [mentors[0], mentors[1]];
  // const secondColumn = [mentors[2]];

  return (
    <section
      ref={sectionRef}
      className="bg-sand py-6 md:py-10 px-6 md:px-20 text-[#533d2e]"
    >
      <h2 className="text-4xl md:text-5xl font-inter font-bold uppercase tracking-widest text-center mb-12">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto items-start">
        {/* together photo */}
        <div className="hidden md:block h-[530px] flex-[0.36]">
          <img
            src="/together.jpg"
            alt="Mentors Together"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
        {/* two mentors */}
        <div className="flex flex-col gap-6 flex-[0.32] w-full">
          {firstColumn.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))}  
        </div>        
        {/* Anna + Why us */}
        <div className="flex flex-col gap-6 flex-[0.32] w-full md:mt-4">
          {/* {secondColumn.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))}           */}

          {/* Why us */}
          <motion.div 
            className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md"
            ref={ref}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <h3 className="text-2xl font-cormorant font-semibold mb-2 uppercase tracking-wide text-[#533d2e]">
              {why.title}
            </h3>
            <div className="text-[#533d2e] leading-relaxed space-y-3">
              {why.description.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

