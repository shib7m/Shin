import { 
  cars, type Car, type InsertCar,
  regions, type Region, type InsertRegion,
  services, type Service, type InsertService,
  bookings, type Booking, type InsertBooking,
  faqs, type FAQ, type InsertFaq
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Cars
  getCars(): Promise<Car[]>;
  getCarsByCategory(category: string): Promise<Car[]>;
  getCarById(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;

  // Regions
  getRegions(): Promise<Region[]>;
  getRegionById(id: number): Promise<Region | undefined>;
  createRegion(region: InsertRegion): Promise<Region>;

  // Services
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // FAQs
  getFaqs(): Promise<FAQ[]>;
  getFaqById(id: number): Promise<FAQ | undefined>;
  createFaq(faq: InsertFaq): Promise<FAQ>;
}

export class MemStorage implements IStorage {
  private cars: Map<number, Car>;
  private regions: Map<number, Region>;
  private services: Map<number, Service>;
  private bookings: Map<number, Booking>;
  private faqs: Map<number, FAQ>;
  private carId: number;
  private regionId: number;
  private serviceId: number;
  private bookingId: number;
  private faqId: number;

  constructor() {
    this.cars = new Map();
    this.regions = new Map();
    this.services = new Map();
    this.bookings = new Map();
    this.faqs = new Map();
    this.carId = 1;
    this.regionId = 1;
    this.serviceId = 1;
    this.bookingId = 1;
    this.faqId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample cars
    const sampleCars: InsertCar[] = [
      {
        name: "Mercedes S-Class",
        arabicName: "مرسيدس S-Class",
        category: "luxury",
        pricePerDay: 120,
        imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=600&h=300",
        passengers: 5,
        transmission: "automatic",
        luggage: 3,
        hasAC: true,
        available: true
      },
      {
        name: "Toyota Land Cruiser",
        arabicName: "تويوتا لاند كروزر",
        category: "suv",
        pricePerDay: 100,
        imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&h=300",
        passengers: 7,
        transmission: "automatic",
        luggage: 5,
        hasAC: true,
        available: true
      },
      {
        name: "Toyota Camry",
        arabicName: "تويوتا كامري",
        category: "sedan",
        pricePerDay: 70,
        imageUrl: "https://images.unsplash.com/photo-1617624085810-3df2165bd3b0?auto=format&fit=crop&w=600&h=300",
        passengers: 5,
        transmission: "automatic",
        luggage: 3,
        hasAC: true,
        available: true
      },
      {
        name: "Toyota Hiace",
        arabicName: "تويوتا هايس",
        category: "minivan",
        pricePerDay: 90,
        imageUrl: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&h=300",
        passengers: 12,
        transmission: "manual",
        luggage: 8,
        hasAC: true,
        available: true
      },
      {
        name: "BMW 7 Series",
        arabicName: "بي إم دبليو الفئة السابعة",
        category: "luxury",
        pricePerDay: 110,
        imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&h=300",
        passengers: 5,
        transmission: "automatic",
        luggage: 3,
        hasAC: true,
        available: true
      },
      {
        name: "Toyota RAV4",
        arabicName: "تويوتا راف فور",
        category: "suv",
        pricePerDay: 80,
        imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&h=300",
        passengers: 5,
        transmission: "automatic",
        luggage: 4,
        hasAC: true,
        available: true
      }
    ];

    sampleCars.forEach(car => this.createCar(car));

    // Sample regions
    const sampleRegions: InsertRegion[] = [
      {
        name: "Sanaa",
        arabicName: "صنعاء",
        hasCars: true,
        hasAirportPickup: true,
        hasDoorDelivery: true,
        hasEmergency: true
      },
      {
        name: "Aden",
        arabicName: "عدن",
        hasCars: true,
        hasAirportPickup: true,
        hasDoorDelivery: true,
        hasEmergency: true
      },
      {
        name: "Taiz",
        arabicName: "تعز",
        hasCars: true,
        hasAirportPickup: true,
        hasDoorDelivery: true,
        hasEmergency: false
      },
      {
        name: "Hodeidah",
        arabicName: "الحديدة",
        hasCars: true,
        hasAirportPickup: true,
        hasDoorDelivery: true,
        hasEmergency: false
      },
      {
        name: "Ibb",
        arabicName: "إب",
        hasCars: true,
        hasAirportPickup: false,
        hasDoorDelivery: true,
        hasEmergency: false
      },
      {
        name: "Hadramout",
        arabicName: "حضرموت",
        hasCars: true,
        hasAirportPickup: true,
        hasDoorDelivery: true,
        hasEmergency: false
      }
    ];

    sampleRegions.forEach(region => this.createRegion(region));

    // Sample services
    const sampleServices: InsertService[] = [
      {
        title: "Car Rental",
        arabicTitle: "تأجير السيارات",
        description: "We provide a variety of modern and luxury cars for daily, weekly or monthly rental.",
        arabicDescription: "نوفر مجموعة متنوعة من السيارات الحديثة والفاخرة للإيجار اليومي أو الأسبوعي أو الشهري.",
        icon: "car-side"
      },
      {
        title: "Airport Pickup",
        arabicTitle: "خدمة التوصيل للمطارات",
        description: "We provide distinguished delivery service to and from all airports in the Yemeni governorates with the highest levels of comfort.",
        arabicDescription: "نقدم خدمة توصيل متميزة من وإلى جميع المطارات في المحافظات اليمنية بأعلى مستويات الراحة.",
        icon: "map-marker-alt"
      },
      {
        title: "Cars with Driver",
        arabicTitle: "سيارات مع سائق",
        description: "We provide professional drivers who speak different languages to ensure a comfortable and safe travel experience at all times.",
        arabicDescription: "نوفر سائقين محترفين يجيدون اللغات المختلفة لضمان تجربة سفر مريحة وآمنة في جميع الأوقات.",
        icon: "user-tie"
      },
      {
        title: "Tourist Trips",
        arabicTitle: "رحلات سياحية",
        description: "We offer comprehensive tourist packages that include car, driver and accommodation to visit the most beautiful tourist attractions in Yemen.",
        arabicDescription: "نقدم باقات سياحية متكاملة تشمل السيارة والسائق والإقامة لزيارة أجمل المعالم السياحية في اليمن.",
        icon: "suitcase"
      },
      {
        title: "Cars for Events",
        arabicTitle: "سيارات للمناسبات",
        description: "We provide luxury cars for special occasions such as weddings and graduation parties with the possibility of decorating them according to request.",
        arabicDescription: "نوفر سيارات فاخرة للمناسبات الخاصة كحفلات الزفاف والتخرج مع إمكانية تزيينها حسب الطلب.",
        icon: "ring"
      },
      {
        title: "Corporate Services",
        arabicTitle: "خدمات الشركات",
        description: "Special packages for companies and institutions, including providing cars with long-term contracts and transportation services for employees.",
        arabicDescription: "باقات خاصة للشركات والمؤسسات تشمل توفير سيارات بعقود طويلة المدى وخدمات النقل للموظفين.",
        icon: "building"
      }
    ];

    sampleServices.forEach(service => this.createService(service));

    // Sample FAQs
    const sampleFaqs: InsertFaq[] = [
      {
        question: "What documents are required to rent a car?",
        arabicQuestion: "ما هي المستندات المطلوبة لتأجير سيارة؟",
        answer: "The documents required to rent a car are: Valid ID card, Valid driver's license, Cash insurance determined according to the type of car, Proof of residence or hotel reservation (for tourists).",
        arabicAnswer: "المستندات المطلوبة لتأجير سيارة هي: بطاقة هوية سارية المفعول، رخصة قيادة سارية المفعول، تأمين نقدي يحدد حسب نوع السيارة، إثبات إقامة أو حجز فندقي (للسياح)."
      },
      {
        question: "Can I rent a car with a driver?",
        arabicQuestion: "هل يمكنني استئجار سيارة مع سائق؟",
        answer: "Yes, we provide car rental service with a professional driver who speaks several languages. This service is available at an additional cost and requires advance booking. You can specify this when completing the booking process or contact our customer service team for more details.",
        arabicAnswer: "نعم، نوفر خدمة استئجار السيارات مع سائق محترف يجيد عدة لغات. هذه الخدمة متوفرة بتكلفة إضافية وتحتاج إلى حجز مسبق. يمكنك تحديد ذلك عند إتمام عملية الحجز أو الاتصال بفريق خدمة العملاء للاستفسار عن التفاصيل."
      },
      {
        question: "Can I cancel the reservation and get a refund?",
        arabicQuestion: "هل يمكنني إلغاء الحجز واسترداد المبلغ؟",
        answer: "Yes, you can cancel the reservation and get a refund according to the following cancellation policy: Cancellation 72 hours before receipt: full refund, Cancellation 48 hours before: 75% refund, Cancellation 24 hours before: 50% refund, Cancellation after that: no refund.",
        arabicAnswer: "نعم، يمكنك إلغاء الحجز واسترداد المبلغ وفقًا لسياسة الإلغاء التالية: الإلغاء قبل 72 ساعة من موعد الاستلام: استرداد كامل المبلغ، الإلغاء قبل 48 ساعة: استرداد 75% من المبلغ، الإلغاء قبل 24 ساعة: استرداد 50% من المبلغ، الإلغاء بعد ذلك: لا يوجد استرداد."
      },
      {
        question: "Can I deliver the car in another governorate?",
        arabicQuestion: "هل يمكنني تسليم السيارة في محافظة أخرى؟",
        answer: "Yes, we provide the service of delivering the car in a different governorate from the receipt governorate, but this service is subject to additional fees depending on the distance between the two governorates. Please specify this when booking to know the additional cost.",
        arabicAnswer: "نعم، نوفر خدمة تسليم السيارة في محافظة مختلفة عن محافظة الاستلام، ولكن هذه الخدمة تخضع لرسوم إضافية تعتمد على المسافة بين المحافظتين. يرجى تحديد ذلك عند الحجز لمعرفة التكلفة الإضافية."
      },
      {
        question: "What happens in case of an accident or breakdown?",
        arabicQuestion: "ماذا يحدث في حالة وقوع حادث أو عطل؟",
        answer: "In case of an accident or breakdown, please call customer service immediately at the number in the rental contract. We will provide the necessary assistance based on your location and the nature of the problem. All our cars are insured, but you may have to pay the amount mentioned in the contract depending on the nature of the accident.",
        arabicAnswer: "في حالة وقوع حادث أو عطل، يرجى الاتصال فورًا بخدمة العملاء على الرقم الموجود في عقد الإيجار. سنوفر المساعدة اللازمة بناءً على موقعك وطبيعة المشكلة. جميع سياراتنا مؤمنة، ولكن قد تتحمل مبلغ التحمل المذكور في العقد حسب طبيعة الحادث."
      },
      {
        question: "Can I extend the rental period?",
        arabicQuestion: "هل يمكنني تمديد فترة الإيجار؟",
        answer: "Yes, you can extend the rental period provided that you notify us at least 24 hours before the end of the contract period, and approval is subject to the availability of the car. You can contact customer service to request an extension and pay the additional fees.",
        arabicAnswer: "نعم، يمكنك تمديد فترة الإيجار بشرط إخطارنا قبل انتهاء فترة العقد بـ 24 ساعة على الأقل، وتخضع الموافقة لتوفر السيارة. يمكنك التواصل مع خدمة العملاء لطلب التمديد ودفع الرسوم الإضافية."
      }
    ];

    sampleFaqs.forEach(faq => this.createFaq(faq));
  }

  // Car methods
  async getCars(): Promise<Car[]> {
    return Array.from(this.cars.values());
  }

  async getCarsByCategory(category: string): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(car => 
      category === "all" ? true : car.category === category
    );
  }

  async getCarById(id: number): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async createCar(car: InsertCar): Promise<Car> {
    const id = this.carId++;
    const newCar: Car = { ...car, id, available: car.available ?? true };
    this.cars.set(id, newCar);
    return newCar;
  }

  // Region methods
  async getRegions(): Promise<Region[]> {
    return Array.from(this.regions.values());
  }

  async getRegionById(id: number): Promise<Region | undefined> {
    return this.regions.get(id);
  }

  async createRegion(region: InsertRegion): Promise<Region> {
    const id = this.regionId++;
    const newRegion: Region = { ...region, id };
    this.regions.set(id, newRegion);
    return newRegion;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const now = new Date();
    const newBooking: Booking = { 
      ...booking, 
      id, 
      status: "pending", 
      createdAt: now 
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking: Booking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // FAQ methods
  async getFaqs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values());
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    return this.faqs.get(id);
  }

  async createFaq(faq: InsertFaq): Promise<FAQ> {
    const id = this.faqId++;
    const newFaq: FAQ = { ...faq, id };
    this.faqs.set(id, newFaq);
    return newFaq;
  }
}

export class DatabaseStorage implements IStorage {
  // Cars methods
  async getCars(): Promise<Car[]> {
    return await db.select().from(cars);
  }

  async getCarsByCategory(category: string): Promise<Car[]> {
    if (category === "all") {
      return await db.select().from(cars);
    }
    return await db.select().from(cars).where(eq(cars.category, category));
  }

  async getCarById(id: number): Promise<Car | undefined> {
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    return car || undefined;
  }

  async createCar(car: InsertCar): Promise<Car> {
    const [newCar] = await db.insert(cars).values(car).returning();
    return newCar;
  }

  // Regions methods
  async getRegions(): Promise<Region[]> {
    return await db.select().from(regions);
  }

  async getRegionById(id: number): Promise<Region | undefined> {
    const [region] = await db.select().from(regions).where(eq(regions.id, id));
    return region || undefined;
  }

  async createRegion(region: InsertRegion): Promise<Region> {
    const [newRegion] = await db.insert(regions).values(region).returning();
    return newRegion;
  }

  // Services methods
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  // Bookings methods
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const now = new Date();
    const [newBooking] = await db.insert(bookings).values({
      ...booking, 
      status: "pending", 
      createdAt: now
    }).returning();
    
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    
    return updatedBooking || undefined;
  }

  // FAQs methods
  async getFaqs(): Promise<FAQ[]> {
    return await db.select().from(faqs);
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq || undefined;
  }

  async createFaq(faq: InsertFaq): Promise<FAQ> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }
}

// Change from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();

// Initialize the database with sample data if it's empty
export async function initializeDatabase() {
  // Check if there are any cars in the database
  const existingCars = await db.select().from(cars);
  if (existingCars.length === 0) {
    console.log("Initializing database with sample data...");
    const memStorage = new MemStorage();
    
    try {
      // Get sample data from MemStorage
      const sampleCars = await memStorage.getCars();
      const sampleRegions = await memStorage.getRegions();
      const sampleServices = await memStorage.getServices();
      const sampleFaqs = await memStorage.getFaqs();
      
      // Insert sample data into the database
      for (const car of sampleCars) {
        const { id, ...carData } = car;
        await db.insert(cars).values({
          ...carData,
          available: carData.available || true
        });
      }
      
      for (const region of sampleRegions) {
        const { id, ...regionData } = region;
        await db.insert(regions).values(regionData);
      }
      
      for (const service of sampleServices) {
        const { id, ...serviceData } = service;
        await db.insert(services).values(serviceData);
      }
      
      for (const faq of sampleFaqs) {
        const { id, ...faqData } = faq;
        await db.insert(faqs).values(faqData);
      }
      
      console.log("Database initialized successfully with sample data!");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  } else {
    console.log("Database already contains data, skipping initialization.");
  }
}
