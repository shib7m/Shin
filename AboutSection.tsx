import { Icons } from "@/lib/icons";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              من <span className="text-gold">نحن</span>
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              شبام لتأجير السيارات شركة رائدة في مجال تأجير السيارات في اليمن، نسعى لتقديم خدمات
              استثنائية لعملائنا من خلال توفير أسطول متنوع من السيارات الحديثة
              والفاخرة.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              تأسست الشركة وتطورت لتصبح واحدة من أهم الشركات في مجال
              تأجير السيارات في اليمن، حيث نغطي معظم المحافظات اليمنية بخدماتنا
              المتميزة من مقرنا الرئيسي في صنعاء، شارع القيادة بجوار بنك كوكب.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              نسعى دائمًا لتقديم أفضل الخدمات بأسعار منافسة، مع الالتزام بأعلى
              معايير الجودة والسلامة لضمان راحة وأمان عملائنا.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gold">+5000</div>
                <div className="text-gray-600">عميل سعيد</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gold">+100</div>
                <div className="text-gray-600">سيارة حديثة</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gold">12</div>
                <div className="text-gray-600">سنة خبرة</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-gold">6</div>
                <div className="text-gray-600">محافظات</div>
              </div>
            </div>

            <a
              href="#"
              className="inline-block px-8 py-3 bg-gold hover:bg-gold-dark text-dark font-bold rounded-md transition"
            >
              اعرف المزيد عنا
            </a>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&h=600"
                alt="Our fleet"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-5 -right-5 bg-white p-6 rounded-lg shadow-lg z-10">
                <Icons.quoteRight className="text-gold text-4xl mb-3" />
                <p className="text-gray-700 mb-3">
                  نوفر لكم تجربة استثنائية وخدمة ممتازة تلبي جميع احتياجاتكم
                </p>
                <p className="text-gold font-bold">- إدارة شبام لتأجير السيارات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
