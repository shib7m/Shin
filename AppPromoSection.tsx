import { Icons } from "@/lib/icons";

const AppPromoSection = () => {
  return (
    <section className="py-16 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              احصل على تطبيق <span className="text-gold">شبام</span> الجديد
            </h2>
            <p className="mb-8 text-gray-300 leading-relaxed">
              قم بتنزيل تطبيق شبام لتأجير السيارات للهواتف الذكية واستمتع بتجربة حجز سلسة،
              ومتابعة حجوزاتك، والاستفادة من العروض الحصرية وبرنامج الولاء. للمزيد من المعلومات تواصل معنا على <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex items-center bg-black hover:bg-gray-900 py-3 px-6 rounded-lg transition"
              >
                <Icons.apple className="text-2xl ml-3" />
                <div>
                  <div className="text-xs">تحميل من</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center bg-black hover:bg-gray-900 py-3 px-6 rounded-lg transition"
              >
                <Icons.googlePlay className="text-2xl ml-3" />
                <div>
                  <div className="text-xs">تحميل من</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&h=750"
              alt="تطبيق الهاتف"
              className="rounded-xl shadow-2xl border-4 border-dark-light mx-auto"
            />
            <div className="absolute -bottom-5 -left-5 bg-gold text-dark p-4 rounded-lg font-bold">
              <div className="text-xl">تنزيل مجاني!</div>
              <div className="text-sm">احصل على خصم 10% على أول حجز</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;
