"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllDecks } from "@/lib/actions/deck.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeckModal from "../components/DeckModal";

const DecksPage = () => {
  const [showModal, setShowModal] = useState<any>(false);
  const [formData, setFormData] = useState<any>({});
  const [decks, setDecks] = useState<any>([]);

  const router = useRouter();

  const fetchDecks = async () => {
    const allDecks = await getAllDecks();
    console.log(allDecks);
    setDecks(allDecks.documents);
  };

  console.log(decks);

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px]">
          <h1 className="text-3xl text-center">Decks</h1>
          <div className="flex justify-center">
            <DeckModal />
          </div>
          <div className="flex flex-wrap flex-row">
            {decks?.map((deck: any) => (
              <Card className="w-[300px] h-[200px] flex items-center justify-center m-4">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link href={`/decks/${deck.$id}`}> {deck.title}</Link>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DecksPage;
