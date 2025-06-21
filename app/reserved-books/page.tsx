"use client";

import { Book, books } from "@/Data/data";
import React, { useEffect, useState } from "react";

const RESERVATION_KEY = "library_reservations";

interface Reservation {
  bookId: number;
  reservedAt: number;
}


interface ReservedBooksPageProps {
  books?: Book[];
}

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

const isExpired = (reservedAt: number) => {
  return Date.now() - reservedAt > THREE_DAYS_MS;
};

const getReservations = (): Reservation[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(RESERVATION_KEY);

  if (!data) return [];
  try {
    return JSON.parse(data) as Reservation[];
  } catch {
    return [];
  }
};

const saveReservations = (reservations: Reservation[]) => {
  localStorage.setItem(RESERVATION_KEY, JSON.stringify(reservations));
};

const ReservedBooksPage: React.FC<ReservedBooksPageProps> = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    let currentReservations = getReservations();

    // Remove expired reservations
    currentReservations = currentReservations.filter(
      (r) => !isExpired(r.reservedAt)
    );
    saveReservations(currentReservations);
    setReservations(currentReservations);
  }, []);

  const cancelReservation = (bookId: number) => {
    const filtered = reservations.filter((r) => r.bookId !== bookId);
    saveReservations(filtered);
    setReservations(filtered);
  };

  const reservedBooks = reservations
    .map((res) => {
      const book = books.find((b) => b.id === res.bookId);
      if (!book) return null;
      return { ...book, reservedAt: res.reservedAt };
    })
    .filter(Boolean) as (Book & { reservedAt: number })[];

  if (reservedBooks.length === 0) {
    return (
      <main className="min-h-screen main_bg backdrop-blur-2xl text-white px-6 py-24 flex flex-col items-center justify-center ">
        <h2 className="text-4xl font-semibold mb-3 text-amber-600">
          No Reserved Books
        </h2>
        <p className="text-lg text-gray-300 max-w-md text-center">
          You have not reserved any books yet. Browse our collection and reserve
          your favorite books!
        </p>
      </main>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-black/50" />

      <main className="min-h-screen text-white px-6 py-[8rem] w-[80%] mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-amber-700">Your Reserved Books</h1>

        <ul className="space-y-8">
          {reservedBooks.map((book) => {
            const expirationDate = new Date(book.reservedAt + THREE_DAYS_MS);
            const reservedDate = new Date(book.reservedAt);

            return (
              <li
                key={book.id}
                className="flex flex-col md:flex-row items-center gap-6 p-6 border rounded-xl shadow-md bg-white"
              >
                <img
                  src={book.cover_image}
                  alt={`Cover of ${book.title}`}
                  className="w-24 h-36 object-cover rounded-md flex-shrink-0"
                  loading="lazy"
                />

                <div className="flex flex-col flex-grow space-y-2 md:space-y-4">
                  <h2 className="text-2xl font-semibold text-black">{book.title}</h2>
                  <p className="text-gray-700 text-lg">by {book.author}</p>

                  <p className="text-gray-600 text-sm">
                    <strong>Reserved on:</strong>{" "}
                    <time dateTime={reservedDate.toISOString()}>
                      {reservedDate.toLocaleDateString()}
                    </time>
                  </p>

                  <p className="text-gray-600 text-sm">
                    <strong>Expires on:</strong>{" "}
                    <time dateTime={expirationDate.toISOString()}>
                      {expirationDate.toLocaleDateString()}
                    </time>
                  </p>
                </div>

                <button
                  onClick={() => cancelReservation(book.id)}
                  aria-label={`Cancel reservation for ${book.title}`}
                  className="mt-4 md:mt-0 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition focus:outline-none focus:ring-4 focus:ring-red-400"
                >
                  Cancel
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </>

  );
};

export default ReservedBooksPage;
