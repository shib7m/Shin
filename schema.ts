import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Car model
export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  arabicName: text("arabic_name").notNull(),
  category: text("category").notNull(), // sedan, suv, luxury, minivan
  pricePerDay: integer("price_per_day").notNull(),
  imageUrl: text("image_url").notNull(),
  passengers: integer("passengers").notNull(),
  transmission: text("transmission").notNull(), // automatic, manual
  luggage: integer("luggage").notNull(),
  hasAC: boolean("has_ac").notNull(),
  available: boolean("available").default(true),
});

// Region model
export const regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  arabicName: text("arabic_name").notNull(),
  hasCars: boolean("has_cars").notNull(),
  hasAirportPickup: boolean("has_airport_pickup").notNull(),
  hasDoorDelivery: boolean("has_door_delivery").notNull(),
  hasEmergency: boolean("has_emergency").notNull(),
});

// Service model
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  arabicTitle: text("arabic_title").notNull(),
  description: text("description").notNull(),
  arabicDescription: text("arabic_description").notNull(),
  icon: text("icon").notNull(),
});

// Booking model
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  pickupLocation: text("pickup_location").notNull(),
  dropoffLocation: text("dropoff_location").notNull(),
  pickupDate: timestamp("pickup_date").notNull(),
  returnDate: timestamp("return_date").notNull(),
  carType: text("car_type").notNull(),
  phone: text("phone").notNull(),
  status: text("status").default("pending"), // pending, confirmed, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// FAQ model
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  arabicQuestion: text("arabic_question").notNull(),
  answer: text("answer").notNull(),
  arabicAnswer: text("arabic_answer").notNull(),
});

// Insert schemas
export const insertCarSchema = createInsertSchema(cars).omit({ id: true });
export const insertRegionSchema = createInsertSchema(regions).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  status: true, 
  createdAt: true 
});
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });

// Insert types
export type InsertCar = z.infer<typeof insertCarSchema>;
export type InsertRegion = z.infer<typeof insertRegionSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertFaq = z.infer<typeof insertFaqSchema>;

// Select types
export type Car = typeof cars.$inferSelect;
export type Region = typeof regions.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
