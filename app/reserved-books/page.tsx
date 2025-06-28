'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ReservedBook {
  _id: string;
  book: {
    _id: string;
    title: string;
    author: string;
    cover_image: string;
  };
  expiresAt: string;
  createdAt: string;
}

const ReservedBooksPage = () => {
  const router = useRouter();
  const [reservedBooks, setReservedBooks] = useState<ReservedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchReservations = async () => {

      const token = localStorage.getItem('token');
      if (!token) {
        return router.push('/');
      }
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}reservations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );
        setReservedBooks(res.data.jsonResponse || []);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const cancelReservation = async (reservationId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = user?.token;

      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}reservations/${reservationId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservedBooks((prev) => prev.filter((r) => r._id !== reservationId));
      toast.success('Reservation cancelled successfully!');
    } catch (error) {
      console.error('Cancel reservation failed:', error);
      toast.error('Failed to cancel reservation.');
    }
  };

  if (!loading && reservedBooks.length === 0) {
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
        <h1 className="text-4xl font-bold mb-8 text-white text-center" data-aos="fade-down">
          Your Reserved Books
        </h1>

        {loading ? (
          <p className="text-xl text-white text-center">Loading reservations...</p>
        ) : (
          <ul className="space-y-8" data-aos="fade-up" data-aos-delay="150">
            {reservedBooks.map((reservation, index) => {
              const { book, createdAt, expiresAt, _id } = reservation;
              const reservedDate = new Date(createdAt);
              const expirationDate = new Date(expiresAt);

              return (
                <li
                  key={_id}
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
                    onClick={() => cancelReservation(_id)}
                    aria-label={`Cancel reservation for ${book.title}`}
                    className="mt-4 md:mt-0 px-5 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition focus:outline-none focus:ring-4 focus:ring-red-400"
                  >
                    Cancel
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default ReservedBooksPage;
