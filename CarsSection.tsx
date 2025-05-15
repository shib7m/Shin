import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import { Icons } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";

const CarCard = ({ car }: { car: Car }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all car-item">
      <div className="h-52 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.arabicName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold">{car.arabicName}</h3>
          <span className="text-gold font-bold">${car.pricePerDay} / يوم</span>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <Icons.users className="text-gold ml-2" />
              <span>{car.passengers} ركاب</span>
            </div>
            <div className="flex items-center">
              <Icons.cog className="text-gold ml-2" />
              <span>{car.transmission === "automatic" ? "أوتوماتيك" : "مانيوال"}</span>
            </div>
            <div className="flex items-center">
              <Icons.suitcase className="text-gold ml-2" />
              <span>{car.luggage} حقائب</span>
            </div>
            <div className="flex items-center">
              <Icons.snowflake className="text-gold ml-2" />
              <span>{car.hasAC ? "تكييف" : "بدون تكييف"}</span>
            </div>
          </div>
        </div>
        <a
          href="#booking"
          className="block text-center py-2 bg-gold hover:bg-gold-dark text-dark font-bold rounded-md transition"
        >
          احجز الآن
        </a>
      </div>
    </div>
  );
};

const CarSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
    <Skeleton className="h-52 w-full bg-gray-200" />
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-200 ml-2" />
              <Skeleton className="h-4 w-16 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="h-10 w-full bg-gray-200 rounded-md" />
    </div>
  </div>
);

const CarsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: cars, isLoading, error } = useQuery<Car[]>({
    queryKey: ["/api/cars"],
  });

  const filteredCars = activeCategory === "all"
    ? cars
    : cars?.filter((car) => car.category === activeCategory);

  return (
    <section id="cars" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            أسطول <span className="text-gold">سيارات شبام</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نمتلك تشكيلة واسعة من أحدث موديلات السيارات الفاخرة لتناسب جميع الاحتياجات. تواصل معنا على <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap bg-white rounded-full shadow-md p-1">
            <button
              className={`px-5 py-2 rounded-full font-bold ${
                activeCategory === "all"
                  ? "bg-gold text-dark"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              الكل
            </button>
            <button
              className={`px-5 py-2 rounded-full font-bold ${
                activeCategory === "sedan"
                  ? "bg-gold text-dark"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory("sedan")}
            >
              سيدان
            </button>
            <button
              className={`px-5 py-2 rounded-full font-bold ${
                activeCategory === "suv"
                  ? "bg-gold text-dark"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory("suv")}
            >
              دفع رباعي
            </button>
            <button
              className={`px-5 py-2 rounded-full font-bold ${
                activeCategory === "luxury"
                  ? "bg-gold text-dark"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory("luxury")}
            >
              فاخرة
            </button>
            <button
              className={`px-5 py-2 rounded-full font-bold ${
                activeCategory === "minivan"
                  ? "bg-gold text-dark"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory("minivan")}
            >
              عائلية
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <CarSkeleton key={i} />
              ))}
            </>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              حدث خطأ أثناء تحميل السيارات. يرجى المحاولة مرة أخرى لاحقاً.
            </div>
          ) : filteredCars?.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              لا توجد سيارات متاحة في هذه الفئة حالياً.
            </div>
          ) : (
            filteredCars?.map((car) => <CarCard key={car.id} car={car} />)
          )}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-dark text-white font-bold rounded-md hover:bg-dark-light transition"
          >
            عرض جميع السيارات
          </a>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
