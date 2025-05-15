const HeroSection = () => {
  return (
    <section className="gradient-bg min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 slide-in">
            <span className="text-gold">شبام</span> لتأجير السيارات الفاخرة
          </h1>
          <p 
            className="text-xl text-gray-200 mb-8 slide-in" 
            style={{ animationDelay: "0.1s" }}
          >
            نوفر لك تجربة استثنائية مع أسطول متنوع من السيارات الفاخرة لجميع المناسبات في كافة المحافظات اليمنية. تواصل معنا على الرقم <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
          </p>
          <div 
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="#booking"
              className="bg-gold hover:bg-gold-dark text-dark-darker text-lg font-bold px-8 py-3 rounded-md text-center transition duration-300"
            >
              احجز سيارتك الآن
            </a>
            <a
              href="#services"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white text-lg font-bold px-8 py-3 rounded-md text-center transition duration-300"
            >
              استكشف خدماتنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
