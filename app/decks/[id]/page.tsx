"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import FlashcardModal from "@/app/components/FlashcardModal";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { getFlashcards } from "@/lib/actions/flashcard.actions";
import { DataTable } from "@/app/components/tables/DataTable";
import { columns } from "@/app/components/tables/columns";
const DeckPage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards, setFlashcards] = useState<any>();

  const params = useParams<any>();
  // const router = useRouter();
  // const id: any = router.query.id;

  const fetchFlashcards = async (deckId: any) => {
    const cards = await getFlashcards(deckId);
    console.log(cards);
    setFlashcards(cards.documents);
  };
  useEffect(() => {
    fetchFlashcards(params.id);
  }, []);

  return (
    <div className="flex h-screen max-h-screen">
      {" "}
      {/* <div className="flex justify-end">
        <Link
          href="/decks/new"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg"
        >
          Add Flashcard
        </Link>
      </div> */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[1020px] flex-1 flex-row py-10">
          <div className="flex  items-center justify-center my-auto">
            {flashcards && (
              <Carousel className="w-1/2 flex align-center justify-center">
                <CarouselContent>
                  {flashcards?.map((flashcard: any, index: number) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="flex w-96 h-72 justify-center items-center m-auto">
                          <CardContent>
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
            )}
          </div>
          <FlashcardModal />
          <div className="flex justify-center">
            {flashcards && <DataTable columns={columns} data={flashcards} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeckPage;
