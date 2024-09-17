import React from "react";
import Link from "next/link";

const DeckCard = ({ title, id }: { title: any; id: any }) => {
  return (
    <div className="relative w-64 h-32 mx-4 bg-white shadow-lg rounded-lg flex items-center justify-center text-xl font-bold text-teal-500">
      <Link href={`/decks/${id}`}>{title}</Link>
    </div>
  );
};

export default DeckCard;
