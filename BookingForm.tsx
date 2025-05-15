import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertBookingSchema } from "@shared/schema";

const bookingFormSchema = z.object({
  pickupLocation: z.string().min(1, "يرجى اختيار موقع الاستلام"),
  dropoffLocation: z.string().min(1, "يرجى اختيار موقع التسليم"),
  pickupDate: z.string().min(1, "يرجى اختيار تاريخ الاستلام"),
  returnDate: z.string().min(1, "يرجى اختيار تاريخ التسليم"),
  carType: z.string().min(1, "يرجى اختيار نوع السيارة"),
  phone: z.string()
    .min(9, "يجب أن يكون رقم الهاتف 9 أرقام على الأقل")
    .max(12, "يجب ألا يتجاوز رقم الهاتف 12 رقمًا")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: "",
      returnDate: "",
      carType: "",
      phone: "",
    }
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      return apiRequest("POST", "/api/bookings", {
        ...data,
        pickupDate: new Date(data.pickupDate),
        returnDate: new Date(data.returnDate),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "تم الحجز بنجاح",
        description: "سنتواصل معك قريباً لتأكيد الحجز. يمكنك أيضًا التواصل معنا مباشرة على الرقم 777492635",
        variant: "default",
      });
      reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "خطأ في الحجز",
        description: error.message || "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    setIsSubmitting(true);
    createBookingMutation.mutate(data);
  };

  return (
    <section id="booking" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            احجز <span className="text-gold">سيارتك الآن</span> مع شبام
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختر الوجهة، نوع السيارة، وتاريخ الحجز بكل سهولة وسرعة. أو تواصل معنا مباشرة على الرقم <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="pickup-location">
                موقع الاستلام
              </label>
              <select
                id="pickup-location"
                {...register("pickupLocation")}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.pickupLocation ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر الموقع</option>
                <option value="sanaa">صنعاء</option>
                <option value="aden">عدن</option>
                <option value="taiz">تعز</option>
                <option value="hodeidah">الحديدة</option>
                <option value="ibb">إب</option>
                <option value="hadramout">حضرموت</option>
              </select>
              {errors.pickupLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="dropoff-location">
                موقع التسليم
              </label>
              <select
                id="dropoff-location"
                {...register("dropoffLocation")}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.dropoffLocation ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر الموقع</option>
                <option value="sanaa">صنعاء</option>
                <option value="aden">عدن</option>
                <option value="taiz">تعز</option>
                <option value="hodeidah">الحديدة</option>
                <option value="ibb">إب</option>
                <option value="hadramout">حضرموت</option>
              </select>
              {errors.dropoffLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="pickup-date">
                تاريخ الاستلام
              </label>
              <input
                type="date"
                id="pickup-date"
                {...register("pickupDate")}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.pickupDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="return-date">
                تاريخ التسليم
              </label>
              <input
                type="date"
                id="return-date"
                {...register("returnDate")}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.returnDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="car-type">
                نوع السيارة
              </label>
              <select
                id="car-type"
                {...register("carType")}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.carType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر النوع</option>
                <option value="sedan">سيدان</option>
                <option value="suv">دفع رباعي</option>
                <option value="luxury">فاخرة</option>
                <option value="minivan">سيارة عائلية</option>
              </select>
              {errors.carType && (
                <p className="text-red-500 text-sm mt-1">{errors.carType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                رقم الهاتف
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="7xxxxxxxx"
                {...register("phone")}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 font-bold rounded-md transition duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-gold hover:bg-gold-dark text-dark"
                }`}
              >
                {isSubmitting ? "جارٍ التأكيد..." : "تأكيد الحجز"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
