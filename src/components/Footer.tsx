import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-neutral-950 text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Brand details */}
          <div id="footer-col-brand" className="space-y-6 md:col-span-2 lg:col-span-5 lg:pr-8">
            <div
              className="flex items-baseline space-x-1.5 sm:space-x-2 cursor-pointer select-none leading-none py-1"
              onClick={() => handleLinkClick('home')}
            >
              <span className="text-[21px] sm:text-[25px] font-bold font-serif text-[#D95C1C] tracking-tight">Wonder</span>
              <span className="text-[21px] sm:text-[25px] font-bold font-serif text-[#16B1BC] tracking-tight">Lanka</span>
              <span className="text-[21px] sm:text-[25px] font-bold font-serif text-[#5BA370] tracking-tight">Experience</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We specialize in tailor-made luxury tours, breathtaking locations, wildlife conservation safaris, and authentic Sri Lankan hospitality. Trust our local experts to guide you across the Pearl of the Indian Ocean.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/wonderofsrilanka/" target="_blank" rel="noreferrer" title="Facebook" aria-label="Facebook" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 cursor-pointer text-neutral-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/wonder.experiences_/" target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300 cursor-pointer text-neutral-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://t.me/wonderlanka" target="_blank" rel="noreferrer" title="Telegram" aria-label="Telegram" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all duration-300 cursor-pointer text-neutral-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.465l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701-.33 4.955c.486 0 .7-.223.973-.486l2.333-2.27 4.85 3.585c.893.493 1.536.24 1.759-.83l3.183-14.995c.325-1.305-.5-1.902-1.353-1.521z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div id="footer-col-links" className="space-y-6 lg:col-span-3">
            <h3 className="text-neutral-100 font-sans font-semibold tracking-wide uppercase text-xs">Quick Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-amber-400 transition-colors pointer-events-auto cursor-pointer">
                  Wonder Lanka Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('destinations')} className="hover:text-amber-400 transition-colors pointer-events-auto cursor-pointer">
                  Featured Destinations
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('experiences')} className="hover:text-amber-400 transition-colors pointer-events-auto cursor-pointer">
                  Authentic Experiences
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('tours')} className="hover:text-amber-400 transition-colors pointer-events-auto cursor-pointer">
                  Tour Packages & Custom Builder
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-amber-400 transition-colors pointer-events-auto cursor-pointer">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div id="footer-col-contact" className="space-y-6 lg:col-span-4">
            <h3 className="text-neutral-100 font-sans font-semibold tracking-wide uppercase text-xs">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/FZTB7hYWxYK94uBPA" target="_blank" rel="noreferrer" className="hover:underline">Find us on Google Maps</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="tel:+94771958093" className="hover:underline">+94 77 195 8093</a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="https://wa.me/94771958093" target="_blank" rel="noopener noreferrer" className="hover:underline">Chat on WhatsApp</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="mailto:wonderlanka.experiences@gmail.com" className="hover:underline break-all">wonderlanka.experiences@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row gap-3 justify-between items-center text-center sm:text-left text-xs text-neutral-500">
          <p>© 2026 Wonder Lanka Experience (Pvt) Ltd. All rights reserved.</p>
          <p>
            Experience crafted by <strong className="font-bold text-neutral-400">StudioColart</strong> · Platform powered by <strong className="font-bold text-neutral-400">Grobern</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
