import { FiInstagram } from "@react-icons/all-files/fi/FiInstagram";
import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane";
import { FaTiktok } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex gap-4 justify-center ${className}`}>
      {[
        { icon: <FiInstagram size={20} />, href: "https://www.instagram.com/notbasic.travel/", bg: "bg-[#AFB19E]/80" },
        { icon: <FaTiktok size={20} />, href: "https://www.tiktok.com/@notbasic.travel?_t=ZN-8yYC6KvVZWo&_r=1", bg: "bg-[#AD966F]/80" },
        { icon: <FaThreads size={20} />, href: "https://www.threads.com/@notbasic.travel?invite=0", bg: "bg-[#999775]/80" },
        { icon: <FaTelegramPlane size={20} />, href: "https://t.me/notbacistravel", bg: "bg-[#AFB19E]/80" },
      ].map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.bg} w-10 h-10 flex items-center justify-center rounded-xl text-white hover:opacity-90 transition-opacity`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}