import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to the merged product data JSON file
    const JSON_PATH = path.join(process.cwd(), "public", "mergedProductData.json");

    // Ensure the file exists
    if (!fs.existsSync(JSON_PATH)) {
      throw new Error("mergedProductData.json not found.");
    }

    // Read and parse the JSON file
    const mergedProductData = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

    // Return the parsed data
    return NextResponse.json(mergedProductData);
  } catch (error) {
    console.error("Error fetching merged product data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch merged product data." },
      { status: 500 }
    );
  }
}