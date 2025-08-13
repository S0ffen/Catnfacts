"use client";

import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import * as motion from "motion/react-client";

export default function Home() {
  const [catData, setCatData] = useState<{
    imageUrl: string;
    fact: string;
  } | null>(null);
  const [breeds, setBreeds] = useState<{ id: string; name: string }[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // tylko żeby widzieć aktualizacje
  useEffect(() => {
    console.log("selectedBreed:", selectedBreed);
  }, [selectedBreed]);

  useEffect(() => {
    fetch("/api/randomcat")
      .then((res) => res.json())
      .then((data) => setCatData(data))
      .catch((error) => console.error("Error fetching cat data:", error));
  }, []);

  useEffect(() => {
    fetch("/api/breeds")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched breeds:", data);
        // Mapujemy tylko id i name
        //TODO: zrozumieć jak to działa i zapamiętać OP
        const simplified = data.map((item: { id: string; name: string }) => ({
          id: item.id,
          name: item.name,
        }));
        console.log("Simplified breeds:", simplified);
        setBreeds(simplified);
      })
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  const handleGenerateNew = () => {
    setCatData(null);
    if (selectedBreed) {
      console.log("Breed selected:", selectedBreed.id);
      fetch(`/api/randomCatByBreed?breed=${selectedBreed.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.imageUrl) {
            //TODO:Notatki porobić do tego
            setCatData({
              imageUrl: data.imageUrl,
              fact: data.fact, // Placeholder for fact, as breed-specific facts are not fetched
            });
          } else {
            console.error("No image found for the selected breed.");
          }
        })
        .catch((error) => console.error("Error fetching new cat data:", error));
    } else {
      console.log("No breed selected, fetching random cat.");
      fetch("/api/randomcat")
        .then((res) => res.json())
        .then((data) => setCatData(data))
        .catch((error) => console.error("Error fetching new cat data:", error));
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mt-8 text-slate-300">
        Cat Facts and Images
      </h1>
      <div className="mt-4">
        <p className="text-lg text-slate-200">
          <Typewriter
            words={["😺 Random Cats", "📚 Funny Facts", "🐾 Lots of Meowing"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={500}
          />
        </p>
        <select
          value={selectedBreed?.id || ""}
          onChange={(e) => {
            const breed = breeds.find((b) => b.id === e.target.value);
            setSelectedBreed(breed || null);
          }}
          className="mt-4 w-full max-w-xs p-2 bg-slate-800 text-slate-50 border border-emerald-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        >
          {/* TODO: Czemu value jest puste? */}
          <option value="" className="bg-slate-800 text-slate-300">
            Random breed
          </option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#34D399", // emerald-400
            boxShadow: "0px 0px 12px #34D399",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-emerald-400 text-black font-semibold px-6 py-2 mt-6 rounded-lg"
          onClick={handleGenerateNew}
        >
          🐱 New Cat
        </motion.button>
      </div>

      <div className="flex justify-center items-center mt-8">
        {catData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          >
            <div className="bg-slate-700 justify-center items-center flex flex-col w-full max-w-screen-md mx-auto p-4  rounded-xl shadow-lg">
              <div className=" p-2 rounded-lg">
                <img
                  src={catData.imageUrl}
                  alt="Kot"
                  width={500}
                  height={500}
                  className="rounded-lg w-full max-w-[500px] mx-auto"
                />
              </div>
              <div className="bg-slate-600 text-emerald-300 w-full mt-4 p-4 rounded-lg shadow-md">
                <span className="mt-2 text-lg">{catData.fact}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
