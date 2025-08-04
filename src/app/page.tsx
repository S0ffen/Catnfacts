"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [catData, setCatData] = useState<{
    imageUrl: string;
    fact: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/randomcat")
      .then((res) => res.json())
      .then((data) => setCatData(data))
      .catch((error) => console.error("Error fetching cat data:", error));
  }, []);

  const handleGenerateNew = () => {
    setCatData(null);
    fetch("/api/randomcat")
      .then((res) => res.json())
      .then((data) => setCatData(data))
      .catch((error) => console.error("Error fetching new cat data:", error));
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">😺 Random cat and fact</h1>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleGenerateNew}
        >
          Generate new
        </button>
      </div>
      <div className="flex justify-center items-center mt-8">
        {catData ? (
          <div className=" bg-cyan-300 justify-center items-center flex flex-col">
            <div className="bg-blue-400">
              <img
                src={catData.imageUrl}
                alt="Kot"
                width={500}
                height={500}
                className="rounded-lg mx-auto"
              />
            </div>
            <div className=" bg-amber-100 w-1/2 mt-4 p-4 rounded-lg shadow-lg">
              <p className="mt-4 text-lg">{catData.fact}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
