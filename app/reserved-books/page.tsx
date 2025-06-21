'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Book, books } from '@/Data/data';
import Image from 'next/image';

const RESERVATION_KEY = 'library_reservations';

interface Reservation {
  bookId: number;
  reservedAt: number;
}

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

const isExpired = (reservedAt: number) => {
  return Date.now() - reservedAt > THREE_DAYS_MS;
};

const getReservations = (): Reservation[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(RESERVATION_KEY);
    return data ? (JSON.parse(data) as Reservation[]) : [];
  } catch {
    return [];
  }
};

const saveReservations = (reservations: Reservation[]) => {
  localStorage.setItem(RESERVATION_KEY, JSON.stringify(reservations));
};

const ReservedBooksPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const current = getReservations();
    const valid = current.filter(r => !isExpired(r.reservedAt));
    saveReservations(valid);
    setReservations(valid);
  }, []);

  const cancelReservation = (bookId: number) => {
    const updated = reservations.filter(r => r.bookId !== bookId);
    saveReservations(updated);
    setReservations(updated);

    alert('Reservation cancelled successfully!');
  };

  const reservedBooks = reservations
    .map(res => {
      const book = books.find(b => b.id === res.bookId);
      if (!book) return null;
      return { ...book, reservedAt: res.reservedAt };
    })
    .filter(Boolean) as (Book & { reservedAt: number })[];

  if (reservedBooks.length === 0) {
    return (
      <main className="min-h-screen main_bg backdrop-blur-2xl text-white px-6 py-24 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold mb-3 text-amber-600" data-aos="zoom-in">
          No Reserved Books
        </h2>
        <p className="text-lg text-gray-300 max-w-md text-center" data-aos="fade-up">
          You have not reserved any books yet. Browse our collection and reserve your favorite books!
        </p>
      </main>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-black/50" />

      <main className="min-h-screen text-white px-6 py-[8rem] w-full md:w-[80%] mx-auto">
        <h1
          className="text-4xl font-bold mb-8 text-white text-center"
          data-aos="fade-down"
        >
          Your Reserved Books
        </h1>

        <ul className="space-y-8" data-aos="fade-up" data-aos-delay="150">
          {reservedBooks.map((book, index) => {
            const reservedDate = new Date(book.reservedAt);
            const expirationDate = new Date(book.reservedAt + THREE_DAYS_MS);

            return (
              <li
                key={book.id}
                className="flex flex-col md:flex-row items-center gap-6 p-6 border rounded-xl shadow-md bg-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-md flex-shrink-0"
                  loading="lazy"
                  width={100}
                  height={100}
                />

                <div className="flex flex-col flex-grow space-y-2 md:space-y-4">
                  <h2 className="text-2xl font-semibold text-black">{book.title}</h2>
                  <p className="text-gray-700 text-lg">by {book.author}</p>

                  <p className="text-gray-600 text-sm">
                    <strong>Reserved on:</strong>{' '}
                    <time dateTime={reservedDate.toISOString()}>
                      {reservedDate.toLocaleDateString()}
                    </time>
                  </p>

                  <p className="text-gray-600 text-sm">
                    <strong>Expires on:</strong>{' '}
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
