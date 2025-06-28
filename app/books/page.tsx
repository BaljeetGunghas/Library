'use client';

import React, { useEffect, useState, Suspense } from 'react';
import BookCard from '@/Components/Home/Books/BooksCard';
import { scrollToTop } from '@/Function/scrollToTop';
import { useSearchParams } from 'next/navigation';
import Aos from 'aos';
import axios from 'axios';
import { Book } from '@/Data/data';

const BooksPage = () => {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading books...</div>}>
      <BooksClient />
    </Suspense>
  );
};

const BooksClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease',
      once: true,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.append('search', query);
        params.append('page', currentPage.toString());

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}books?${params.toString()}`);
        setBooks(response.data.jsonResponse || []);
        setTotalPages(response.data.total || 1);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, currentPage]);

  return (
    <>
      <div className="absolute inset-0 bg-black/50" />

      <main className="min-h-screen text-white px-6 py-[8rem] w-full md:w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
          Books
        </h1>

        {loading ? (
          <p className="text-white text-center text-xl my-16" data-aos="zoom-in">Loading books...</p>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <div key={book._id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-10" data-aos="fade-up" data-aos-delay="300">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  scrollToTop();
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>

              <span className="text-lg font-semibold px-4 py-2">
                Page {currentPage} of {Math.ceil(totalPages / 8)}
              </span>

              <button
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  scrollToTop();
                }}
                disabled={currentPage >= Math.ceil(totalPages / 8)}
                className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-white text-4xl my-20" data-aos="zoom-in">
            No books found.
          </p>
        )}
      </main>
    </>
  );
};

export default BooksPage;
