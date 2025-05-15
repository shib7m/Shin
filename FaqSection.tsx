import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FAQ } from "@shared/schema";
import { Icons } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSkeleton = () => (
  <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
    <div className="bg-white px-6 py-4">
      <Skeleton className="h-6 w-full bg-gray-200" />
    </div>
  </div>
);

const FaqSection = () => {
  const { data: faqs, isLoading, error } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            الأسئلة <span className="text-gold">الشائعة</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            إليك إجابات على الأسئلة الشائعة حول خدمات شبام لتأجير السيارات وعملية الحجز. لمزيد من الاستفسارات تواصل معنا على <a href="https://wa.me/967777492635" className="text-gold hover:underline">777492635</a>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <FaqSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              حدث خطأ أثناء تحميل الأسئلة الشائعة. يرجى المحاولة مرة أخرى لاحقاً.
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs?.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`faq-${faq.id}`}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="bg-white px-6 py-4 font-bold text-right">
                    {faq.arabicQuestion}
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 px-6 py-4 text-gray-700">
                    {faq.arabicAnswer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
