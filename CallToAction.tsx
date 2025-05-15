const CallToAction = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="gold-gradient h-3"></div>
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              جاهز <span className="text-gold">للانطلاق؟</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              احجز سيارتك الآن مع شبام لتأجير السيارات واستمتع بأفضل خدمة تأجير سيارات في اليمن. سيارات
              حديثة، أسعار منافسة وخدمة عملاء متميزة. تواصل معنا على الرقم 777492635.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#booking"
                className="bg-gold hover:bg-gold-dark text-dark font-bold px-8 py-3 rounded-md transition"
              >
                احجز الآن
              </a>
              <a
                href="https://wa.me/967777492635"
                className="bg-dark hover:bg-dark-light text-white font-bold px-8 py-3 rounded-md transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                تواصل معنا عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
