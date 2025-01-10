// GENERATES PRODUCT DATA CSV FILE AND RESIZES IMAGES FOR FACEBOOK FEED

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";
import SFTPClient from "ssh2-sftp-client";
import { parse } from "csv-parse";
import { resizeImage } from "@/utils/apiHelpers";

const config = {
  host: process.env.SFTP_HOST || "",
  port: Number(process.env.SFTP_PORT) || 22,
  username: process.env.SFTP_USERNAME || "",
  password: process.env.SFTP_PASSWORD || "",
};

const remoteFilePath =
  "/mnt/cloudstorage1/srv/googlefeed/feed/flex_facebook_feed_magento.csv";

const JSON_PATH = path.join(process.cwd(), "public", "mergedProductData.json");
const OUTPUT_CSV_PATH = path.join(process.cwd(), "public", "productData.csv");
const IMAGE_OUTPUT_DIR = path.join(process.cwd(), "public", "resized");

const PRODUCT_COUNT = parseInt(
  process.env.NEXT_PUBLIC_CRON_PRODUCT_COUNT || "100"
);

// Utility function to clear the resized folder
function clearFolder(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.unlinkSync(filePath); // Delete the file
    });
  }
}

export async function GET() {
  const sftp = new SFTPClient();

  try {
    // Clear the resized folder before processing
    clearFolder(IMAGE_OUTPUT_DIR);

    // Ensure the output directory for images exists
    if (!fs.existsSync(IMAGE_OUTPUT_DIR)) {
      fs.mkdirSync(IMAGE_OUTPUT_DIR, { recursive: true });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/generateMergedProductData`,
      {
        method: "GET",
        headers: {
          "x-api-auth-token": process.env.API_AUTH_TOKEN || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate Merged Product Data}`);
    }

    // Ensure the merged product JSON file exists
    if (!fs.existsSync(JSON_PATH)) {
      throw new Error("Merged product data file not found.");
    }

    // Load the merged product JSON data
    const mergedProductData = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
    const validIds = new Set(
      mergedProductData.map((product: any) => product.mpn)
    );

    // Connect to SFTP
    await sftp.connect(config);

    // Download the CSV file to a local temporary file
    const tempFilePath = path.join(process.cwd(), "temp.csv");
    await sftp.fastGet(remoteFilePath, tempFilePath);

    // Read and parse the downloaded CSV file
    const rows: any[] = [];
    const originalHeaders = [
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "price",
      "link",
      "image_link",
      "brand",
      "quantity_to_sell_on_facebook",
      "google_product_category",
      "sale_price",
      "additional_image_link",
      "size",
      "color",
      "gender",
      "material",
    ];

    const parser = fs
      .createReadStream(tempFilePath)
      .pipe(parse({ columns: originalHeaders, from_line: 2 }));

    for await (const row of parser) {
      // Skip rows that don't match any id in mergedProductData
      if (!validIds.has(row.id.slice(4))) continue;

      // Resize the image for the current row
      const resizedImageUrl = await resizeImage(
        row.image_link, // Assuming `image_link` contains the image URL
        IMAGE_OUTPUT_DIR,
        `${row.id}.jpg`
      );

      // Add the new column (header_image_link) to the row
      row.header_image_link = row.image_link;
      row.image_link = resizedImageUrl;

      rows.push(row);

      if (rows.length === PRODUCT_COUNT) break; // Stop after fetching PRODUCT_COUNT rows
    }

    // Save the first PRODUCT_COUNT rows to the output CSV file
    const createCsvWriter = createObjectCsvWriter;
    const writer = createCsvWriter({
      path: OUTPUT_CSV_PATH,
      header: [
        ...originalHeaders.map((header) => ({ id: header, title: header })),
        { id: "header_image_link", title: "header_image_link" }, // Add the new column
      ],
    });

    await writer.writeRecords(rows);

    // Cleanup: Delete the temporary file
    fs.unlinkSync(tempFilePath);

    return NextResponse.json(
      {
        message: `Successfully processed ${rows.length} rows and saved images to ${IMAGE_OUTPUT_DIR}`,
      },
      {
        headers: {
          "Cache-Control": "no-store", // Disable caching
        },
      }
    );
  } catch (error) {
    console.error("Error fetching or processing the CSV:", error);
    return NextResponse.json(
      { error: "Failed to fetch or process CSV" },
      { status: 500 }
    );
  } finally {
    // Ensure SFTP connection is closed
    sftp.end();
  }
}