"use server";

import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export type FlashcardParams = {
  question: string;
  answer: string;
  deck: string;
  lastReviewed: Date;
};

export type UpdateFlashcardParams = {
  flashcardId: string;
  question: string;
  answer: string;
  deck: string;
  lastReviewed: Date;
};

export const createFlashcard = async (flashcard: FlashcardParams) => {
  try {
    const newFlashcard = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_FLASHCARD_COLLECTION_ID!,
      ID.unique(),
      flashcard
    );
    return parseStringify(newFlashcard);
  } catch (error) {
    console.log(error);
  }
};

export const getFlashcard = async (flashcardId: string) => {
  try {
    const flashcard = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_FLASHCARD_COLLECTION_ID!,
      [Query.equal("$id", [flashcardId])]
    );
    return parseStringify(flashcard);
  } catch (error) {
    console.log(error);
  }
};

export const getFlashcards = async (deckId: string) => {
  try {
    const flashcard = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_FLASHCARD_COLLECTION_ID!,
      [Query.equal("deck", [deckId])]
    );
    return parseStringify(flashcard);
  } catch (error) {
    console.log(error);
  }
};
export const updateFlashcard = async ({
  flashcardId,
  question,
  answer,
  deck,
  lastReviewed,
}: UpdateFlashcardParams) => {
  try {
    const updatedFlashcard = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_FLASHCARD_COLLECTION_ID!,
      flashcardId,
      { question, answer, deck, lastReviewed }
    );
    return parseStringify(updatedFlashcard);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFlashcard = async ({
  flashcardId,
}: {
  flashcardId: string;
}) => {
  try {
    const deletedFlashcard = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_FLASHCARD_COLLECTION_ID!,
      flashcardId
    );
    return parseStringify(deletedFlashcard);
  } catch (error) {
    console.log(error);
  }
};
