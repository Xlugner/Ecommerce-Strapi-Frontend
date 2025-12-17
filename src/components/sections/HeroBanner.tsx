import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroBannerProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

/**
 * COMPONENTE: HeroBanner
 * 
 * Carousel/Banner principal con:
 * - Auto-play
 * - Navegación con dots
 * - Fondo con gradiente
 * - Formas orgánicas decorativas
 */
export const HeroBanner = ({ 
  slides, 
  autoPlay = true, 
  interval = 5000 
}: HeroBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full"
          >
            {/* Slide Content */}
            <div className="relative bg-hero-gradient rounded-2xl mx-4 my-6 overflow-hidden">
              {/* Formas decorativas */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-turquoise-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary-700 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-turquoise-300 rounded-full opacity-20 blur-2xl"></div>

              <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 min-h-[400px]">
                {/* Texto */}
                <div className="text-white z-10">
                  {slide.badge && (
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-4">
                      <span className="text-white font-bold text-sm uppercase tracking-wider">
                        {slide.badge}
                      </span>
                    </div>
                  )}
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight uppercase">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-6 uppercase tracking-wide">
                    {slide.subtitle}
                  </p>

                  {slide.ctaText && slide.ctaLink && (
                    <a
                      href={slide.ctaLink}
                      className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {slide.ctaText}
                    </a>
                  )}
                </div>

                {/* Imagen */}
                <div className="relative z-10 flex justify-center items-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots de Navegación */}
      <div className="flex justify-center gap-2 pb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-primary-500 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;