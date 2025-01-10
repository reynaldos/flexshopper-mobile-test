import path from "path";
import sharp from "sharp";

export async function resizeImage(
  imageUrl: string,
  outputDir: string,
  fileName: string
): Promise<string> {
  try {
    
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(imageUrl, {
      method: "GET",
      cache: "no-store", // Prevent caching
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const outputPath = path.join(outputDir, fileName);

    await sharp(Buffer.from(buffer))
      .resize(1200, 628, { fit: "contain", position: "center" })
      .toFile(outputPath);

    return `${BASE_URL}/resized/${fileName}`;
  } catch (error) {
    console.error("Error resizing image:", error);
    return imageUrl; // Fallback to the original URL
  }
}