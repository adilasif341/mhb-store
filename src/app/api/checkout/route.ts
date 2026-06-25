import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { subtotal?: number };
  const orderNumber = `MHB-${Date.now().toString().slice(-7)}`;

  return NextResponse.json({
    orderNumber,
    status: "pending",
    total: body.subtotal ?? 0,
  });
}
