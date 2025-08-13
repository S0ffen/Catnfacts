import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const breed = req.nextUrl.searchParams.get("breed");
  if (!breed) {
    return NextResponse.json(
      { error: "Breed parameter is required" },
      { status: 400 }
    );
  }
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`
  );
  const factRes = await fetch("https://meowfacts.herokuapp.com/");

  if (!res.ok || !factRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch cat image or fact" },
      { status: res.status }
    );
  }
  const catUrl = await res.json();
  const factData = await factRes.json(); // Fetching a fact, but not using it here
  return NextResponse.json({
    imageUrl: catUrl?.[0]?.url,
    fact: factData.data[0] || "Brak faktu😿", // Placeholder for fact
  });
}
