import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [catResponse, factResponse] = await Promise.all([
      fetch("https://api.thecatapi.com/v1/images/search"),
      fetch("https://meowfacts.herokuapp.com/"),
    ]);

    const catData = await catResponse.json();
    const factData = await factResponse.json();
    return NextResponse.json({
      imageUrl: catData[0].url || "",
      fact: factData.data[0] || "Brak faktu😿",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      imageUrl: "",
      fact: "Błąd podczas pobierania danych😿",
    });
  }
}
