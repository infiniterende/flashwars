import React from "react";
import Link from "next/link";

const DeckCard = ({ title, id }: { title: any; id: any }) => {
  return (
    <div className="relative w-64 h-32 mx-4 bg-white shadow-lg rounded-lg cursor-pointer group perspective">
      <div className="absolute w-full h-full rounded-lg bg-white text-teal-600 flex items-center justify-center text-xl font-bold backface-hidden transform group-hover:rotate-y-180 transition duration-500">
        <Link href={`/decks/${id}`}>{title}</Link>
      </div>
    </div>
  );
};

export default DeckCard;
