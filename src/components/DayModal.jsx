import { useEffect } from "react";
import { IoArrowForwardCircleOutline, IoBanOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";



export default function DayModal({ isOpen, onClose, day, setDay, allDays }) {
  if (!isOpen || !day) return null;
  const currentIndex = allDays.findIndex((d) => d.index === day.index);
  const hasNext = currentIndex < allDays.length - 1;
  const hasPrev = currentIndex > 0;

  const goNext = () => {
    const i = allDays.findIndex(d => d.index === day.index);
    const next = allDays[i + 1];
    if (next) setDay({ ...next });
  };

  const goPrev = () => {
    const i = allDays.findIndex(d => d.index === day.index);
    const prev = allDays[i - 1];
    if (prev) setDay({ ...prev });
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF1DC] md:w-[570px]  w-full p-0 overflow-hidden shadow-2xl font-sans max-h-[99vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 bg-[#FDE9C9] rounded-3xl right-4 text-[#FB7B3F] hover:text-red-500 text-3xl z-10"
          aria-label="Close"
        >
          <IoIosCloseCircleOutline size={42} />
        </button>

        {/* Images Grid */}
        {day.images && day.images.length >= 3 && (
          <div className="grid grid-cols-[1fr_1.3fr] gap-2 pt-5 px-4 items-start">
            <img
              src={day.images[0]}
              alt="img1"
              className="rounded-xl object-cover object-center w-full h-40 sm:h-48"
            />
            <img
              src={day.images[1]}
              alt="img2"
              className="rounded-xl object-cover object-center w-full h-40 sm:h-48"
            />

            <img
              src={day.images[2]}
              alt="img3"
              className="rounded-xl object-cover object-center w-full h-60 sm:h-72"
            />
            <div className="flex flex-col h-60 sm:h-72 px-4 py-4 mb-2">
              <p className="text-[#565C1A] font-intel text-center md:text-[28px] leading-snug md:mb-2">
                {day.dayLabel}
              </p>
              <p className="text-[#533d2e] font-bold md:font-cormorant text-base text-center md:text-[34px] leading-snug md:mb-2">
                {day.intro} {day.emoji && day.emoji}
              </p>
              <p className="text-[#533d2e] text-sm md:text-base leading-snug">
                {day.details1}
              </p>
            </div>

            <div className="col-span-2 px-2 sm:px-4 mt-4">
              <p className="text-[#533d2e] text-sm md:text-base leading-relaxed text-center">
                {day.details2}
              </p>
            </div>
            
          </div>

        )}
          {/* Navigation Buttons */}
          <div className="flex justify-between px-8 mb-2">
            {/* Previous button */}
            {hasPrev ? (
                <button
                onClick={goPrev}
                className="text-[#FB7B3F] hover:scale-110 transition-transform duration-200"
                aria-label="Previous day"
                >
                <IoArrowForwardCircleOutline
                    size={42}
                    className="rotate-180"
                />
                </button>
            ) : (
                <div className="text-[#dc6e1b] opacity-50">
                <IoBanOutline size={34} />
                </div>
            )}

            {/* Next button */}
            {hasNext ? (
                <button
                onClick={goNext}
                className="text-[#FB7B3F] hover:scale-110 transition-transform duration-200"
                aria-label="Next day"
                >
                <IoArrowForwardCircleOutline
                    size={42}
                />
                </button>
            ) : (
                <div className="text-[#dc6e1b] opacity-50">
                <IoBanOutline size={34} />
                </div>
            )}
          </div>
        </div>
    </div>
  );
}
