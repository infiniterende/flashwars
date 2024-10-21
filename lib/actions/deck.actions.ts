"use server";

import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export type DeckParams = {
  title: string;
};

export type UpdateDeckParams = {
  deckId: string;
  title: string;
};

export const createDeck = async (deck: DeckParams) => {
  try {
    const newDeck = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DECK_COLLECTION_ID!,
      ID.unique(),
      deck
    );
    return parseStringify(newDeck);
  } catch (error) {
    const existingDecks = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DECK_COLLECTION_ID!,
      [Query.equal("title", [deck.title])]
    );
    return existingDecks;

    console.error("An error occurred while creating a new user:", error);
  }
};

export const getDeck = async (deckId: string) => {
  try {
    const deck = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DECK_COLLECTION_ID!,
      [Query.equal("$id", [deckId])]
    );
    return parseStringify(deck);
  } catch (error) {
    console.log(error);
  }
};

export const getAllDecks = async () => {
  try {
    const decks = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DECK_COLLECTION_ID!
    );
    return parseStringify(decks);
  } catch (error) {
    console.log(error);
  }
};

export const updateDeck = async ({ deckId, title }: UpdateDeckParams) => {
  try {
    const updatedFlashcard = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DECK_COLLECTION_ID!,
      deckId,
      { title }
    );
    return parseStringify(updatedFlashcard);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDeck = async ({ deckId }: { deckId: string }) => {
  try {
    const deletedFlashcard = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_DECK_COLLECTION_ID!,
      deckId
    );
    return parseStringify(deletedFlashcard);
  } catch (error) {
    console.log(error);
  }
};
