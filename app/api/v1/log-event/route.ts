import { NextResponse } from "next/server";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";

// Ensure the logs directory and CSV files exist
const ensureLogsFile = (filePath: string, headers: string) => {
  const logsDir = path.dirname(filePath);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, headers);
  }
};

export async function POST(req: Request) {
  // // Paths for CSV files
  const trafficCsvFilePath = path.join(
    process.cwd(),
    "public/logs",
    "traffic_events.csv"
  );
  const buttonClicksCsvFilePath = path.join(
    process.cwd(),
    "public/logs",
    "button_clicks.csv"
  );

  // Configure CSV writers
  const csvWriters = {
    traffic: createObjectCsvWriter({
      path: trafficCsvFilePath,
      header: [
        { id: "inbound_url", title: "Inbound URL" },
        { id: "redirect_route", title: "Redirect Route" },
        { id: "product_id", title: "Product ID" },
        { id: "timestamp", title: "Timestamp" },
      ],
      append: true,
    }),
    button_click: createObjectCsvWriter({
      path: buttonClicksCsvFilePath,
      header: [
        { id: "inbound_url", title: "Inbound URL" },
        { id: "redirect_route", title: "Redirect Route" },
        { id: "product_id", title: "Product ID" },
        { id: "timestamp", title: "Timestamp" },
      ],
      append: true,
    }),
  };

  ensureLogsFile(
    trafficCsvFilePath,
    "Inbound URL,Redirect Route,Product ID,Timestamp\n"
  );
  ensureLogsFile(
    buttonClicksCsvFilePath,
    "Inbound URL,Redirect Route,Product ID,Timestamp\n"
  );

  try {
    const body = await req.json();

    const { eventType, inboundUrl, redirectRoute, productId } = body;

    // Validate eventType
    if (!eventType || !["traffic", "button_click"].includes(eventType)) {
      return NextResponse.json(
        { message: "Invalid or missing eventType" },
        { status: 400 }
      );
    }

    const record = {
      inbound_url: inboundUrl || "",
      redirect_route: redirectRoute || "",
      product_id: productId || "",
      timestamp: `${new Date().toISOString()}`,
    };

    // Write to the appropriate CSV file
    await csvWriters[eventType as "traffic" | "button_click"].writeRecords([
      record,
    ]);

    return NextResponse.json({
      message: `${eventType} event logged successfully`,
    });
  } catch (error) {
    console.error("Failed to log event:", error);
    return NextResponse.json(
      { message: "Failed to log event" },
      { status: 500 }
    );
  }
}