import { NextResponse } from "next/server";
import path from "path";
import { createObjectCsvWriter } from "csv-writer";
import productList from "@/mock/categorizedProductList";
import { CsvProduct, ProductInfo } from "@/types/index";

const PRODUCT_COUNT = parseInt(
  process.env.NEXT_PUBLIC_CRON_PRODUCT_COUNT || "100"
);

const FLEXSHOPPER_URL = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL;

export async function GET() {

  const CSV_PATH = path.join(process.cwd(), "public", "productData.csv");
  const topProducts = productList.slice(0, PRODUCT_COUNT);

  try {
    const products = await Promise.all(
      topProducts.map(async (product) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchProduct/${product.id}`,
          {
            method: 'GET',
            headers: {
              'x-api-auth-token': process.env.API_AUTH_TOKEN || '',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data for ID: ${product.id}`);
        }

        const data: ProductInfo = await response.json();

        // Extract necessary fields from data and map to CSV format
        const inventory =
          data.inventories.find((inv) => inv.primaryFlag) ||
          data.inventories[0];
        const image =
          data.images.find((img) => img.primaryFlag) || data.images[0];

        const { markedUpPrice, salePrice } = {
          markedUpPrice:
            (data.inventories[0]?.markedUpRetailPrice ||
              data.inventories[0]?.markedUpPrice ||
              data.inventories[0]?.itemCost) / 100,
          salePrice:
            ((data.inventories[0]?.markedUpRetailPrice ||
              data.inventories[0]?.markedUpPrice ||
              data.inventories[0]?.itemCost) /
              100 /
              52) *
            2,
        };

        const csvProduct: CsvProduct = {
          id: data.id,
          title: data.name,
          description: data.description,
          availability: inventory?.qty > 0 ? "in stock" : "out of stock",
          condition: inventory?.condition || data.condition,
          price: `${markedUpPrice.toFixed(2).split(".")[0]}.${
            markedUpPrice.toFixed(2).split(".")[1]
          } USD`,
          link: `${FLEXSHOPPER_URL}/product/${data.slug}`,
          image_link: image?.sourceCdn || "",
          brand: data.brand.displayName || data.brand.name,
          quantity_to_sell_on_facebook: `${inventory?.qty || 0}`,
          google_product_category: `${
            getGoogleProductCategoryID(product.category) || 0
          }`,
          sale_price: `${salePrice.toFixed(2).split(".")[0]}.00 USD`,
          additional_image_link: data.images
            .slice(1, 3)
            .map((img) => img.sourceCdn)
            .join(", "),
          size:
            data.attributeList.find(
              (attr) => attr.name.toLowerCase() === "size"
            )?.value || "",
          color:
            data.attributeList.find(
              (attr) => attr.name.toLowerCase() === "color"
            )?.value || "",
          gender:
            data.attributeList.find(
              (attr) => attr.name.toLowerCase() === "gender"
            )?.value || "",
          material:
            data.attributeList.find(
              (attr) => attr.name.toLowerCase() === "material"
            )?.value || "",
        };

        return csvProduct;
      })
    );

    const csvWriter = createObjectCsvWriter({
      path: CSV_PATH,
      header: [
        { id: "id", title: "id" },
        { id: "title", title: "title" },
        { id: "description", title: "description" },
        { id: "availability", title: "availability" },
        { id: "condition", title: "condition" },
        { id: "price", title: "price" },
        { id: "link", title: "link" },
        { id: "image_link", title: "image_link" },
        { id: "brand", title: "brand" },
        {
          id: "quantity_to_sell_on_facebook",
          title: "quantity_to_sell_on_facebook",
        },
        { id: "google_product_category", title: "google_product_category" },
        { id: "sale_price", title: "sale_price" },
        { id: "additional_image_link", title: "additional_image_link" },
        { id: "size", title: "size" },
        { id: "color", title: "color" },
        { id: "gender", title: "gender" },
        { id: "material", title: "material" },
      ],
    });

    await csvWriter.writeRecords(products);

    return NextResponse.json({ message: "CSV updated successfully" });
  } catch (error) {
    console.error("Error updating CSV:", error);
    return NextResponse.json(
      { error: "Failed to update CSV" },
      { status: 500 }
    );
  }
}

const googleProductCategoryMap: { [key: string]: number } = {
  appliances: 696, // Home Appliances
  audio: 233, // Electronics > Audio
  "cameras-and-camcorders": 152, // Cameras & Optics > Cameras
  "cell-phones": 267, // Electronics > Communications > Telephony > Mobile Phones
  "computers-and-tablets": 479, // Computers & Electronics > Computers
  furniture: 436, // Furniture
  "garage-and-outdoor": 780, // Home & Garden > Lawn & Garden
  "health-fitness-sports": 554, // Sporting Goods > Exercise & Fitness
  "jewelry-and-watches": 188, // Apparel & Accessories > Jewelry
  "living-room-furniture": 4946, // Furniture > Living Room Furniture Sets
  mattresses: 3290, // Home & Garden > Furniture > Beds & Accessories > Mattresses
  "musical-instruments": 353, // Arts & Entertainment > Hobbies & Creative Arts > Musical Instruments
  "tv-and-home-theater": 229, // Electronics > Video > Televisions
  "video-games": 566, // Video Games & Consoles > Video Games
};

function getGoogleProductCategoryID(category: string): number | undefined {
  return googleProductCategoryMap[category] || undefined;
}
