import { useQuery } from "@tanstack/react-query";
import { Region } from "@shared/schema";
import { Icons } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";

const RegionCard = ({ region }: { region: Region }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-3">{region.arabicName}</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            {region.hasCars ? (
              <Icons.checkCircle className="text-gold ml-2" />
            ) : (
              <Icons.minusCircle className="text-gray-400 ml-2" />
            )}
            {region.hasCars ? "جميع أنواع السيارات متوفرة" : "السيارات غير متوفرة"}
          </li>
          <li className="flex items-center">
            {region.hasAirportPickup ? (
              <Icons.checkCircle className="text-gold ml-2" />
            ) : (
              <Icons.minusCircle className="text-gray-400 ml-2" />
            )}
            {region.hasAirportPickup
              ? "خدمة التوصيل من المطار"
              : "خدمة التوصيل من المطار غير متوفرة"}
          </li>
          <li className="flex items-center">
            {region.hasDoorDelivery ? (
              <Icons.checkCircle className="text-gold ml-2" />
            ) : (
              <Icons.minusCircle className="text-gray-400 ml-2" />
            )}
            {region.hasDoorDelivery
              ? "توصيل السيارة لباب المنزل"
              : "توصيل السيارة لباب المنزل غير متوفر"}
          </li>
          <li className="flex items-center">
            {region.hasEmergency ? (
              <Icons.checkCircle className="text-gold ml-2" />
            ) : (
              <Icons.minusCircle className="text-gray-400 ml-2" />
            )}
            {region.hasEmergency
              ? "خدمة الصيانة الطارئة متوفرة"
              : "خدمة الصيانة الطارئة غير متوفرة"}
          </li>
        </ul>
      </div>
    </div>
  );
};

const RegionSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
    <div className="p-6">
      <Skeleton className="h-6 w-1/3 bg-gray-200 mb-3" />
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="flex items-center">
            <Skeleton className="h-4 w-4 rounded-full bg-gray-200 ml-2" />
            <Skeleton className="h-4 w-full bg-gray-200" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const RegionsSection = () => {
  const { data: regions, isLoading, error } = useQuery<Region[]>({
    queryKey: ["/api/regions"],
  });

  return (
    <section id="regions" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            مناطق <span className="text-gold">خدمات شبام</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نغطي جميع المحافظات الرئيسية في اليمن بخدمات حجز وتأجير السيارات والتوصيل. للاستفسار اتصل بنا على <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <RegionSkeleton key={i} />
              ))}
            </>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              حدث خطأ أثناء تحميل المناطق. يرجى المحاولة مرة أخرى لاحقاً.
            </div>
          ) : (
            regions?.map((region) => <RegionCard key={region.id} region={region} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
