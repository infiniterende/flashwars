"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const DeckPage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards, setFlashcards] = useState<any>();

  const params = useParams<any>();
  // const router = useRouter();
  // const id: any = router.query.id;

  const fetchDeck = async () => {
    try {
      const response = await fetch(`/api/flashcards/${parseInt(params.id)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse JSON here
      console.log("Data received:", data);
      setFlashcards(data.deck); // Return parsed data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };

  console.log("f", flashcards);
  useEffect(() => {
    fetchDeck();
  }, []);

  return (
    <div className="">
      {" "}
      <div className="flex justify-end">
        <Link
          href="/decks/new"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg"
        >
          Add Flashcard
        </Link>
      </div>
      <div className="flex  items-center justify-center">
        <Carousel className="w-1/2 flex align-center justify-center">
          <CarouselContent>
            {flashcards?.map((flashcard: any, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      {!showAnswer && (
                        <span className="">{flashcard.question}</span>
                      )}
                      {showAnswer && (
                        <span className="">{flashcard.answer}</span>
                      )}
                    </CardContent>
                  </Card>
                  <div className="flex flex-col items-center justify-center p-6">
                    <Button
                      className="bg-teal-500 text-white"
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {showAnswer ? "Hide Answer" : "Show Answer"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="carousel-previous bg-teal-500 text-white" />
          <CarouselNext className="carousel-next bg-teal-500 text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default DeckPage;
