import { pool, db } from "./db";
import * as schema from "@shared/schema";
import { log } from "./vite";
import { sql } from "drizzle-orm";

export async function runMigrations() {
  log("Running database migrations...");
  
  try {
    // Create tables based on schema
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        arabic_name TEXT NOT NULL,
        category TEXT NOT NULL,
        price_per_day INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        passengers INTEGER NOT NULL,
        transmission TEXT NOT NULL,
        luggage INTEGER NOT NULL,
        has_ac BOOLEAN NOT NULL,
        available BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS regions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        arabic_name TEXT NOT NULL,
        has_cars BOOLEAN NOT NULL,
        has_airport_pickup BOOLEAN NOT NULL,
        has_door_delivery BOOLEAN NOT NULL,
        has_emergency BOOLEAN NOT NULL
      );

      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        arabic_title TEXT NOT NULL,
        description TEXT NOT NULL,
        arabic_description TEXT NOT NULL,
        icon TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        pickup_location TEXT NOT NULL,
        dropoff_location TEXT NOT NULL,
        pickup_date TIMESTAMP NOT NULL,
        return_date TIMESTAMP NOT NULL,
        car_type TEXT NOT NULL,
        phone TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        arabic_question TEXT NOT NULL,
        answer TEXT NOT NULL,
        arabic_answer TEXT NOT NULL
      );
    `);

    log("Database migration completed successfully!");
    return true;
  } catch (error) {
    log(`Error during migration: ${error}`);
    return false;
  }
}