import { useRef, useState, useEffect } from "react";
import content from "../content.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { motion } from "framer-motion";
import { CheckCircle, MinusCircle } from "lucide-react";

export default function PriceBlock() {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const { price } = content[lang];
  const [showBlock, setShowBlock] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowBlock(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sand py-20 px-6 md:px-20 text-[#533d2e]"
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-cormorant font-bold uppercase tracking-widest text-center mb-12">
        {price.title}
      </h2>

      {/* Central description block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showBlock ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center space-y-4 mb-16"
      >
        {price.description.map((line, idx) => (
          <p
            key={idx}
            className="text-base leading-relaxed text-[#533d2e]/90"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </motion.div>

      {/* Includes / Excludes blocks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showBlock ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10"
      >
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md border border-[#d7c5b2]/50">
          <h3 className="text-xl font-cormorant font-semibold mb-4 text-[#533d2e]">
            {price.include}
          </h3>
          <div className="space-y-4">
            {price.includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                    <div className="min-w-[24px] h-[24px] mt-1">
                    <CheckCircle className="text-green-600 w-full h-full" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#533d2e]/80">{item}</p>
                </div>
              
            ))}
          </div>
        </div>

        {/* Не входить */}
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-[#d7c5b2]/30">
          <h3 className="text-xl font-cormorant font-semibold mb-4 text-[#533d2e]">
            {price.exclude}
          </h3>
          <div className="space-y-4">
            {price.excludes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                    <div className="min-w-[24px] h-[24px] mt-1">
                    <MinusCircle className="text-[#846d53]/70 w-full h-full" />
                    </div>
                    <p className="text-sm leading-relaxed text-[#533d2e]/80">{item}</p>
                </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}