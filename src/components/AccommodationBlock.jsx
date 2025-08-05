import { useLanguage } from "../LanguageContext.jsx";
import content from "../content.jsx";
import {
  Waves,
  WavesLadder,
  Dumbbell,
  Wifi,
  Coffee,
  Home,
  ShoppingBag
} from "lucide-react";

const iconMap = {
  "waves": <Waves size={20} />,
  "waves-ladder": <WavesLadder size={20} />,
  "dumbbell": <Dumbbell size={20} />,
  "wifi": <Wifi size={20} />,
  "coffee": <Coffee size={20} />,
  "home": <Home size={20} />,
  "shopping-bag": <ShoppingBag size={20} />
};

export default function AccommodationBlock() {
    const { lang } = useLanguage();
    const { title, header, description, features, add } = content[lang].accommodation;
    return (
      <section className="bg-sand px-8 md:px-20 text-[#533d2e] py-6 md:py-10">
        <h2 className="text-4xl md:text-5xl font-cormorant font-bold uppercase tracking-widest text-center mb-12">
            {title}
        </h2>
        <div className="flex flex-col-reverse md:flex-row gap-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <img src="/hotel1.jpg" alt="Hotel View 1" className="rounded-xl w-full object-cover" />
            <img src="/hotel2.jpg" alt="Hotel View 2" className="rounded-xl w-full object-cover" />
            <img src="/hotel3.jpg" alt="Hotel View 3" className="rounded-xl w-full object-cover" />
            <img src="/hotel4.jpg" alt="Hotel View 4" className="rounded-xl w-full object-cover" />
            <img src="/hotel5.jpg" alt="Hotel View 5" className="rounded-xl w-full object-cover" />
            <img src="/hotel6.jpg" alt="Hotel View 6" className="rounded-xl w-full object-cover" />
          </div>
          {/* Text Block */}
          <div className="flex-1 space-y-4 md:mt-12">
            {description.map((text, index) => (
              <p
                key={index}
                className="text-[#533d2e] text-sm md:text-base leading-relaxed mb-3"
                dangerouslySetInnerHTML={{ __html: text }}
              />
          ))}
          <ul className="text-base mt-4 space-y-3">
            {features.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 ml-5">{iconMap[item.icon]}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg leading-relaxed font-semibold pt-4">
            {add}
          </p>
        </div>
      </div>
    </section>
  );
}
