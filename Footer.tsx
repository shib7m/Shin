import { Link } from "wouter";
import { Icons } from "@/lib/icons";

const Footer = () => {
  return (
    <footer className="bg-dark-darker text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">شبام</span>{" "}
              <span className="text-gold">لتأجير</span>{" "}
              <span className="text-gold-dark">السيارات</span>
            </h3>
            <p className="text-gray-400 mb-6">
              نوفر لكم خدمة تأجير سيارات فاخرة بأسعار منافسة وجودة عالية في جميع أنحاء اليمن.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-gold transition">
                <Icons.facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition">
                <Icons.twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition">
                <Icons.instagram />
              </a>
              <a href="https://wa.me/967777492635" className="text-gray-400 hover:text-gold transition">
                <Icons.whatsapp />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-gold transition">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/#cars" className="text-gray-400 hover:text-gold transition">
                  أسطول السيارات
                </Link>
              </li>
              <li>
                <Link href="/#regions" className="text-gray-400 hover:text-gold transition">
                  مناطق الخدمة
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-gold transition">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-400 hover:text-gold transition">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">معلومات الاتصال</h4>
            <ul className="space-y-3">
              <li className="flex">
                <Icons.mapMarker className="text-gold ml-3 mt-1" />
                <span className="text-gray-400">اليمن - صنعاء، شارع القيادة بجوار بنك كوكب</span>
              </li>
              <li className="flex">
                <Icons.phone className="text-gold ml-3 mt-1" />
                <a href="https://wa.me/967777492635" className="text-gray-400 hover:text-gold transition">+967 777492635</a>
              </li>
              <li className="flex">
                <Icons.envelope className="text-gold ml-3 mt-1" />
                <span className="text-gray-400">info@shibamcarrental.com</span>
              </li>
              <li className="flex">
                <Icons.clock className="text-gold ml-3 mt-1" />
                <span className="text-gray-400">السبت - الخميس: 8 صباحاً - 8 مساءً</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">النشرة الإخبارية</h4>
            <p className="text-gray-400 mb-4">
              اشترك في نشرتنا الإخبارية للحصول على آخر العروض والتحديثات
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="py-2 px-4 rounded-r-md w-full focus:outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-dark py-2 px-4 rounded-l-md"
                >
                  <Icons.paperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 شبام لتأجير السيارات. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-500 text-sm hover:text-gold transition">
                الشروط والأحكام
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-gold transition">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-gold transition">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
