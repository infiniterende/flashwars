// app/api/route.js 👈🏽

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// To handle a POST request to /api
export async function GET(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Methods", "GET");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const deck = await prisma.deck.findMany({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json({ deck });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Do whatever you want
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set("Access-Control-Allow-Methods", "POST");
  request.headers.set("Access-Control-Allow-Headers", "Content-Type");
  const body = await request.json();
  console.log(body);

  const newFlashcard = await prisma.flashcard.create({
    data: {
      question: body.question,
      answer: body.answer,
      deckId: params.id,
    },
  });
  return NextResponse.json(newFlashcard, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
