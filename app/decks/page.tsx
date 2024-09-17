"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import Select from "react-select";
import AddFlashcard from "../components/AddFlashcard";

import DeckCard from "../components/DeckCard";

const DecksPage = () => {
  const [showModal, setShowModal] = useState<any>(false);
  const [formData, setFormData] = useState<any>({});
  const [decks, setDecks] = useState<any>([]);

  console.log(formData);
  console.log(showModal);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/decks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse JSON here
      console.log("Data received:", data);
      setDecks(data.decks); // Return parsed data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    console.log(data);
    try {
      const response = await fetch("/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      const resData = await response.json();
      console.log(resData.body);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    // revalidatePath("/");
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-500">
          Decks
        </h2>
        <div className="flex justify-center">
          <button
            className=" px-8 py-2 bg-teal-500 border-black text-white shadow-md rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add Deck
          </button>
        </div>
      </div>
      <div className="flex min-h-screen text-center">
        {/* Sidebar */}

        <div className="flex flex-row flex-wrap my-8">
          {decks.map((deck: any) => (
            <DeckCard id={deck.id} title={deck.title} />
          ))}
        </div>

        {/* Main content area */}
      </div>

      {showModal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  {/* <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"> */}
                  <div className="sm:flex sm:justify-center md:flex md:justify-center mb-6">
                    <form onSubmit={handleSubmit} className="">
                      <div className="mb-4">
                        <label
                          className="block text-teal-500 text-lg font-bold mb-2 text-center"
                          htmlFor="deck"
                        >
                          Deck
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="title"
                          required
                          onChange={handleChange}
                          placeholder="Title"
                          value={formData.title}
                        />
                      </div>

                      <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecksPage;
