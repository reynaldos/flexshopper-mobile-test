// CREATES CSV FILE WITH MERGED PRODUCT DATA FOR LEGACY PRODUCTS THAT MATCH NEW CATELOG

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import SFTPClient from "ssh2-sftp-client";
import { parse } from "csv-parse";

const config = {
  host: process.env.SFTP_HOST || "",
  port: Number(process.env.SFTP_PORT) || 22,
  username: process.env.SFTP_USERNAME || "",
  password: process.env.SFTP_PASSWORD || "",
};

const remoteFilePath =
  "/mnt/cloudstorage1/srv/googlefeed/feed/flex_facebook_feed_magento.csv";

const JSON_PATH = path.join(process.cwd(), "public", "legacyProductData.json");
const OUTPUT_JSON_PATH = path.join(
  process.cwd(),
  "public",
  "mergedProductData.json"
);

export async function GET() {
  const sftp = new SFTPClient();

  try {
    // Ensure the legacy JSON file exists
    if (!fs.existsSync(JSON_PATH)) {
      throw new Error("Legacy product data file not found.");
    }

    // Load the legacy JSON data
    const jsonData = fs.readFileSync(JSON_PATH, "utf-8");
    const legacyProducts = JSON.parse(jsonData);

    // Connect to SFTP and download the remote CSV file
    const tempCsvPath = path.join(process.cwd(), "temp_facebook_feed.csv");
    await sftp.connect(config);
    await sftp.fastGet(remoteFilePath, tempCsvPath);

    // Parse the remote CSV file
    const csvRows: any[] = [];
    const csvParser = fs
      .createReadStream(tempCsvPath)
      .pipe(parse({ columns: true, trim: true }));

    for await (const row of csvParser) {
      csvRows.push(row);
    }

    // Merge data from legacy and updated products
    const mergedProducts = legacyProducts
      .map((product: any) => {
        const updatedProduct = csvRows.find(
          (csvItem) => csvItem.id.slice(4) === product.mpn
        );

        if (!updatedProduct) return null;

        // Return a strict object with only the specified properties
        return {
          legacy_id: product.id,
          id: updatedProduct.id,
          mpn: product.mpn,
          name: updatedProduct.title,
          description: product.description,
          slug: product.slug,
          features: product.features || "",
          specs: product.specs || "",
          images: [
            updatedProduct.image_link,
            ...product.images.map((img: any) => img.source),
          ],
          link: updatedProduct.link,
          price: parseFloat(updatedProduct.price.slice(0,-4)).toFixed(2),
          sale_price: parseFloat(updatedProduct.sale_price.slice(0,-4)).toFixed(2),
          availability: updatedProduct.availability,
          condition: updatedProduct.condition,
          brand: product.brand || "",
          vendorName:
            product.inventories && product.inventories[0]
              ? product.inventories[0].vendor.name
              : "",
          size:
            product.attributeList?.find(
              (attr: any) => attr.name.toLowerCase() === "size"
            )?.value || "",
          color:
            product.attributeList?.find(
              (attr: any) => attr.name.toLowerCase() === "color"
            )?.value || "",
          gender:
            product.attributeList?.find(
              (attr: any) => attr.name.toLowerCase() === "gender"
            )?.value || "",
          material:
            product.attributeList?.find(
              (attr: any) => attr.name.toLowerCase() === "material"
            )?.value || "",
            category: product.breadcrumbs[0].slug || ""
        };
      })
      .filter((item: any) => item !== null); // Remove unmatched products

    // Write the merged products to a JSON file
    fs.writeFileSync(
      OUTPUT_JSON_PATH,
      JSON.stringify(mergedProducts, null, 2),
      "utf-8"
    );

    // Cleanup: Delete the temporary CSV file
    fs.unlinkSync(tempCsvPath);

    return NextResponse.json(
      {
        message: `JSON created successfully with ${mergedProducts.length} merged products.`,
        data: mergedProducts,
      },
      {
        headers: {
          "Cache-Control": "no-store", // Disable caching
        },
      }
    );
  } catch (error) {
    console.error("Error processing clean product list:", error);
    return NextResponse.json(
      { error: "Failed to process clean product list" },
      { status: 500 }
    );
  } finally {
    // Ensure SFTP connection is closed
    sftp.end();
  }
}
