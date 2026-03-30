import React, { useState } from "react";

const REUNIONS = [
  {
    title: "1985 Batch 40th Year Reunion",
    date: "6 February 2026",
    images: ["/reunion1985.jpeg"],
  },
  {
    title: "2000 Batch Silver Jubilee Reunion",
    date: "22 December 2025",
    images: ["/reunion2000.jpeg", "/reunion2000a.jpeg", "/reunion2000b.jpeg", "/reunion2000c.jpeg", "/reunion2000d.jpeg", "/reunion2000e.jpeg"],
  },
  {
    title: "25th Year Reunion of ME VLSI Systems",
    date: "8 December 2025",
    images: ["/1975.jpeg"],
  },
  {
    title: "1970 Batch Reunion",
    date: "23 September 2025",
    images: ["/reunion1970.JPG", "/reunion1970b.JPG", "/reunion1970c.JPG", "/reunion1970d.JPG"],
  },
  {
    title: "REC 1975 Golden Jubilee Reunion",
    date: "25 January 2025",
    images: ["/reunion25jan25.jpg"],
    details: [
      "On January 25th, the Batch of 1975 celebrated their Golden Jubilee, with 95 alumni along with their families gathering to commemorate 50 years of shared experiences, and contributions to their alma mater.",
      "The reunion fostered meaningful student-alumni interactions, where alumni shared career insights, and industry perspectives, reinforcing the enduring bond and legacy of NIT Trichy."
    ]
  },
  {
    title: "Diamond Jubilee Reunion",
    date: "20 January 2025",
    images: ["/reunion20jan25.jpg"],
    details: [
      "The first batch of students from Regional Engineering College Tiruchirappalli, celebrated the Diamond Jubilee reunion 20th January 2025",
      "Around 15 alumni, accompanied by their spouses, participated in the celebration, spending the day reminiscing about their student days and reconnecting with old friends",
      "The batch also made a contribution of three lakh rupees to the REC Middle School"
    ]
  },
  {
    title: "Silver Jubilee Reunion - REConnecT99_00",
    subtitle: "The Class of 1999, Engineering and Class of 2000, Architecture on the 19th and 20th of December, 2024",
    date: "19-20 December 2024",
    images: ["/reunion20dec24.jpg", "/reunion20dec24b.jpg"],
    details: [
      "More than 230 alums attended the REConnecT99_00 from various parts of the world",
      "The batch contributed close to Rs. 45 lakhs in donations institute facility enrichment which includes create / refurbish new labs, revamp hostel infrastructure and support student education."
    ]
  },
  {
    title: "1984 Batch 40th Year Reunion",
    date: "20 September 2024",
    images: ["/1984.jpeg"],
  },
  {
    title: "1974 Batch Golden Jubilee Reunion",
    date: "25 January 2024",
    images: ["/1974.jpeg"],
  },
];

export default function Reunion() {
  const [selectedReunion, setSelectedReunion] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  REUNION
                </h1>
                <p className="mt-2 text-amber-100/80 text-base sm:text-lg max-w-2xl">
                  Celebrating the enduring bonds and shared memories of our alumni
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Reunions Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REUNIONS.map((reunion, index) => (
            <ReunionCard 
              key={index} 
              reunion={reunion}
              onClick={() => setSelectedReunion(reunion)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedReunion && (
        <ReunionModal 
          reunion={selectedReunion}
          onClose={() => setSelectedReunion(null)}
        />
      )}
    </div>
  );
}

function ReunionCard({ reunion, onClick }) {
  const hasDetails = reunion.details;

  return (
    <article 
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={reunion.images[0]}
          alt={reunion.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge for multiple images */}
        {reunion.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <ImageIcon className="h-3.5 w-3.5" />
            {reunion.images.length}
          </div>
        )}

        {/* Overlay hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-white text-sm font-medium flex items-center gap-1.5">
            Click to view details
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-serif font-semibold text-stone-900 leading-tight line-clamp-2">
          {reunion.title}
        </h3>
        {reunion.subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-stone-600 line-clamp-2">
            {reunion.subtitle}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2 text-amber-700">
          <CalendarIcon className="h-4 w-4" />
          <span className="text-xs sm:text-sm font-medium">{reunion.date}</span>
        </div>
        
        {/* Details indicator */}
        {hasDetails && (
          <div className="mt-3 pt-3 border-t border-stone-100">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <InfoIcon className="h-3.5 w-3.5" />
              Click for more details
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

function ReunionModal({ reunion, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = reunion.images.length > 1;
  const hasDetails = reunion.details;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === reunion.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? reunion.images.length - 1 : prev - 1
    );
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-none sm:rounded-2xl shadow-2xl w-full sm:max-w-5xl sm:my-8 max-h-screen sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all backdrop-blur-sm"
          aria-label="Close modal"
        >
          <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-screen sm:max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-br from-amber-950 to-stone-900 text-white p-5 sm:p-6 md:p-8 pr-12 sm:pr-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold leading-tight">
              {reunion.title}
            </h2>
            {reunion.subtitle && (
              <p className="mt-2 text-amber-100/90 text-sm sm:text-base leading-relaxed">
                {reunion.subtitle}
              </p>
            )}
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-amber-200">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm font-medium">{reunion.date}</span>
            </div>
          </div>

          {/* Details Section */}
          {hasDetails && (
            <div className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 bg-white border-b border-stone-200">
              <div>
                <ul className="space-y-3 sm:space-y-4">
                  {reunion.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-stone-700">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-600" />
                      <span className="leading-relaxed text-sm sm:text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className="relative bg-stone-50 p-5 sm:p-6 md:p-8">
            <div className="relative w-full">
              <div className="flex items-center justify-center bg-stone-100 rounded-xl overflow-hidden">
                <img
                  src={reunion.images[currentImageIndex]}
                  alt={`${reunion.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>
              
              {/* Navigation for multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                    {currentImageIndex + 1} / {reunion.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {hasMultipleImages && (
              <div className="mt-4 sm:mt-6">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100">
                  {reunion.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-amber-600 ring-2 ring-amber-600/30' 
                          : 'border-stone-200 hover:border-amber-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* No details message */}
          {!hasDetails && (
            <div className="p-6 sm:p-8 text-center bg-white border-b border-stone-200">
              <p className="text-stone-500 italic text-sm sm:text-base">
                More details coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icon Components
function CalendarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm12 8H5v9a1 1 0 001 1h12a1 1 0 001-1v-9zM6 8h12V6H6v2z" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
