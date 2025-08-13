import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await res.json();

  return NextResponse.json(data);
}
