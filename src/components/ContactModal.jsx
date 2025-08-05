import { useState, useEffect } from "react";
import content from "../content";
import { useLanguage } from "../LanguageContext";
import { FiX } from "react-icons/fi";
import SocialLinks from "./SocialLinks";
import emailjs from "@emailjs/browser";

const MAX_MESSAGES_PER_DAY = 3;

export default function ContactModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const t = content[lang].modal;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null); // null | 'success' | 'limit'

  useEffect(() => {
    if (!isOpen) return;
    setSent(null);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      message: t.defaultMessage,
      honeypot: "",
    });
  }, [isOpen, lang]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = t.nameRequired || "Name is required";
    if (!formData.email.trim()) errs.email = t.emailRequired || "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = t.emailInvalid || "Email is invalid";
    return errs;
  };

  const getTodayCount = () => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("messageAttempts") || "{}");
    return stored[today] || 0;
  };

  const incrementTodayCount = () => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("messageAttempts") || "{}");
    stored[today] = (stored[today] || 0) + 1;
    localStorage.setItem("messageAttempts", JSON.stringify(stored));
  };

  const handleChange = (e) => {
    if (!e?.target?.name) return;
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      console.warn("Bot detected. Ignoring submission.");
      return;
    }

    if (getTodayCount() >= MAX_MESSAGES_PER_DAY) {
      setSent("limit");
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSending(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        incrementTodayCount();
        setSent("success");
        setSending(false);
      })
      .catch((error) => {
        console.error("Email send error:", error);
        setSending(false);
        alert(t.sendError);
      });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-[9999]"
        onClick={onClose}
      ></div>
      {/* Modal wrapper */}
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
        <div
          className="bg-[#EDD4B5] sm:p-8 mx-2 sm:mx-auto rounded-xl max-w-lg w-full p-8 shadow-lg relative font-sans transition-all duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 text-[#533d2e] hover:text-[#dc6e1b] w-9 h-9 flex items-center justify-center"
            aria-label="Close modal"
          >
            <FiX className="w-7 h-7" />
          </button>
          {/* Success */}
          {sent === "success" && (
            <div className="text-center text-[#533d2e] font-semibold text-lg mt-6 px-4 max-w-xs mx-auto">
              {t.thankYou}
            </div>
          )}
          {/* Limit */}
          {sent === "limit" && (
            <div className="text-center text-[#533d2e] font-semibold text-lg mt-6 px-4 max-w-xs mx-auto">
              {t.tooManyMessages}
            </div>
          )}

          {/* Form */}
          {!sent && (
            <>
              <h3 className="text-[#533d2e] text-2xl sm:text-3xl sm:mt-2 font-cormorant font-semibold mb-4 mt-3 text-center tracking-widest uppercase">
                {t.header}
              </h3>
              <SocialLinks className="flex justify-center gap-3 scale-90 sm:scale-100 mb-2" />
              <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  autoComplete="off"
                  tabIndex="-1"
                />

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block mb-1 text-[#533d2e] font-medium tracking-wide">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className={`w-full rounded-lg px-5 py-3 border border-[#C6B79B] text-[#533d2e] bg-[#f9f4ee] placeholder-[#a1885e]
                      focus:outline-none focus:ring-2 focus:ring-[#dc6e1b] transition-all duration-200 shadow-sm
                      ${errors.name ? "ring-2 ring-red-400" : ""}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-1 text-[#533d2e] font-medium tracking-wide">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    required
                    className={`w-full rounded-lg px-5 py-3 border border-[#C6B79B] text-[#533d2e] bg-[#f9f4ee] placeholder-[#a1885e]
                      focus:outline-none focus:ring-2 focus:ring-[#dc6e1b] transition-all duration-200 shadow-sm
                      ${errors.email ? "ring-2 ring-red-400 border-red-400" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block mb-1 text-[#533d2e] font-medium tracking-wide">
                    {t.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    className="w-full rounded-lg px-5 py-3 border border-[#C6B79B] text-[#533d2e] bg-[#f9f4ee] placeholder-[#a1885e]
                      focus:outline-none focus:ring-2 focus:ring-[#dc6e1b] transition-all duration-200 shadow-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#533d2e] hover:bg-[#7b5a3c] text-[#EDD4B5] font-cormorant text-lg sm:text-xl py-2 sm:py-3 rounded-md transition-all duration-200"
                >
                  {sending ? t.sending : t.send}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
