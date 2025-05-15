import { useState } from "react";
import { Link } from "wouter";
import { Icons } from "@/lib/icons";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-gold font-bold text-2xl">
            <span className="text-white">شبام</span>{" "}
            <span className="text-gold-dark">لتأجير</span>{" "}
            <span className="text-gold">السيارات</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 space-x-reverse">
          <Link href="/" className="text-white hover:text-gold transition font-medium">
            الرئيسية
          </Link>
          <Link href="/#services" className="text-white hover:text-gold transition font-medium">
            خدماتنا
          </Link>
          <Link href="/#cars" className="text-white hover:text-gold transition font-medium">
            السيارات
          </Link>
          <Link href="/#regions" className="text-white hover:text-gold transition font-medium">
            المناطق
          </Link>
          <Link href="/#about" className="text-white hover:text-gold transition font-medium">
            من نحن
          </Link>
          <Link href="/#faq" className="text-white hover:text-gold transition font-medium">
            الأسئلة الشائعة
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <Icons.bars className="text-xl" />
          </button>
        </div>

        {/* Book Button */}
        <a
          href="#booking"
          className="hidden md:inline-block px-6 py-2 bg-gold text-dark-darker rounded-md font-bold hover:bg-gold-dark transition"
        >
          احجز الآن
        </a>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-dark-darker md:hidden">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a href="#" className="text-white hover:text-gold transition py-2 border-b border-gray-700">
              الرئيسية
            </a>
            <a href="#services" className="text-white hover:text-gold transition py-2 border-b border-gray-700">
              خدماتنا
            </a>
            <a href="#cars" className="text-white hover:text-gold transition py-2 border-b border-gray-700">
              السيارات
            </a>
            <a href="#regions" className="text-white hover:text-gold transition py-2 border-b border-gray-700">
              المناطق
            </a>
            <a href="#about" className="text-white hover:text-gold transition py-2 border-b border-gray-700">
              من نحن
            </a>
            <a href="#faq" className="text-white hover:text-gold transition py-2 border-b border-gray-700">
              الأسئلة الشائعة
            </a>
            <a
              href="#booking"
              className="text-center py-3 bg-gold text-dark-darker rounded-md font-bold hover:bg-gold-dark transition"
            >
              احجز الآن
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
