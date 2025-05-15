import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Icons } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";

const ServiceCard = ({ service }: { service: Service }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "car-side":
        return <Icons.carSide />;
      case "map-marker-alt":
        return <Icons.mapMarker />;
      case "user-tie":
        return <Icons.userTie />;
      case "suitcase":
        return <Icons.suitcase />;
      case "ring":
        return <Icons.ring />;
      case "building":
        return <Icons.building />;
      default:
        return <Icons.star />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:shadow-lg hover:-translate-y-2 border-t-4 border-gold">
      <div className="text-gold text-3xl mb-4">
        {getIconComponent(service.icon)}
      </div>
      <h3 className="text-xl font-bold mb-3">{service.arabicTitle}</h3>
      <p className="text-gray-600 mb-4">{service.arabicDescription}</p>
      <a href="#" className="text-gold font-bold hover:text-gold-dark flex items-center">
        المزيد <Icons.arrowLeft className="mr-2" />
      </a>
    </div>
  );
};

const ServiceSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-200">
    <Skeleton className="h-8 w-8 rounded-full bg-gray-200 mb-4" />
    <Skeleton className="h-6 w-2/3 bg-gray-200 mb-3" />
    <Skeleton className="h-4 w-full bg-gray-200 mb-2" />
    <Skeleton className="h-4 w-full bg-gray-200 mb-2" />
    <Skeleton className="h-4 w-3/4 bg-gray-200 mb-4" />
    <Skeleton className="h-4 w-1/4 bg-gray-200" />
  </div>
);

const ServicesSection = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            خدمات <span className="text-gold">شبام</span> المميزة
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات لتلبية احتياجاتك في جميع أنحاء اليمن. تواصل معنا على <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <ServiceSkeleton key={i} />
              ))}
            </>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى لاحقاً.
            </div>
          ) : (
            services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
