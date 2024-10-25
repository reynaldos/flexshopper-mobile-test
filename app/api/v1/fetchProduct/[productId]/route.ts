// pages/api/product/[id].ts

export async function GET(
  { params }: { params: Promise<{ productId: string }> }
) {
  const productId = (await params).productId;

  if (!productId) {
    return new Response(JSON.stringify({ message: "Product Id required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Replace with your actual data source or API endpoint
    const response = await fetch(
      `https://apis.flexshopper.com/synthetics-fmcore/marketplace/Products/${productId}/overview`,
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.FMCORE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if(data.error)
      return new Response(
        JSON.stringify({
          message: `Failed to fetch product data for id ${productId}`,
          errorDetails: data.error,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";

    console.error(errorMessage, errorStack);

    return new Response(
      JSON.stringify({
        message: `Failed to fetch product data for id ${productId}`,
        errorMessage,
        errorDetails: errorStack,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
