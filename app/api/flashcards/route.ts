// app/api/route.js 👈🏽

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// To handle a POST request to /api
export async function GET(request: NextRequest) {
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Methods", "GET");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const flashcards = await prisma.flashcard.findMany();
  return NextResponse.json({ flashcards });
}

export async function POST(request: NextRequest) {
  // Do whatever you want
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Methods", "POST");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const body = await request.json();
  console.log(body);

  const { question, answer, deckId } = body;

  const newFlashcard = await prisma.flashcard.create({
    data: {
      question: question,
      answer: answer,
      deckId: deckId,
    },
  });
  return NextResponse.json(newFlashcard, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
