'use client';

import BookCard from '@/Components/Home/Books/BooksCard';
import { Book, books } from '@/Data/data';
import { scrollToTop } from '@/Function/scrollToTop';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BooksPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query')?.toLowerCase() || '';
    const category = searchParams.get('category')?.toLowerCase() || '';

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;

    useEffect(() => {
        const initAOS = async () => {
            Aos.init({
                duration: 1000,
                easing: 'ease',
                once: true,
                anchorPlacement: 'top-bottom'
            })
        }

        initAOS()
    }, [])

    // Filter books
    const filteredBooks = books.filter((book) => {
        const inTitle = book.title.toLowerCase().includes(query);
        const inAuthor = book.author.toLowerCase().includes(query);
        const inCategory = book.category.toLowerCase().includes(query);
        const matchesQuery = query ? inTitle || inAuthor || inCategory : true;
        const matchesCategory = category ? book.category.toLowerCase() === category : true;
        return matchesQuery && matchesCategory;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

    return (
        <>
            <div className="absolute inset-0 bg-black/50" />

            <main className="min-h-screen text-white px-6 py-[8rem] w-[80%] mx-auto">
                <h1
                    className="text-3xl font-bold mb-6"
                    data-aos="fade-down"
                >
                    Books
                </h1>

                {currentBooks.length > 0 ? (
                    <>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        >
                            {currentBooks.map((book: Book, index) => (
                                <div
                                    key={book.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}  // staggered animation
                                >
                                    <BookCard book={book} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div
                            className="flex justify-center gap-2 mt-10"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <button
                                onClick={() => {
                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                    scrollToTop()
                                }}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="text-lg font-semibold px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => {
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    scrollToTop()
                                }}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p
                        className="text-center text-white text-4xl my-20"
                        data-aos="zoom-in"
                    >
                        No books found.
                    </p>
                )}
            </main>
        </>

    );
};

export default BooksPage;
