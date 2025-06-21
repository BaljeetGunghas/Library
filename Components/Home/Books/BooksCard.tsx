// BookCard.tsx
'use client';

import React, { useState } from 'react';
import { Book } from '@/Data/data';
import BookDetailsModal from './BookDetailsModal';
import Image from 'next/image';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="backdrop-blur-3xl p-4 rounded-xl shadow hover:shadow-md transition-all cursor-pointer text-white"
            >
                <Image
                    src={book.cover_image}
                    alt={book.title}
                    className="w-full h-80 object-contain rounded-md"
                    width={100}
                    height={150}
                    loading='lazy'
                    onError={(e) => {
                        e.currentTarget.src = '/images/no-image-found.png'; // fallback image
                    }}
                />
                <h2 className="text-lg font-semibold mt-3">{book.title}</h2>
                <p className="text-sm text-gray-300">{book.author}</p>
                <p className="text-sm text-indigo-400">{book.category}</p>
                <p className="text-sm mt-2 line-clamp-2 text-gray-200">{book.description}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-bold text-green-400">${book.price.toFixed(2)}</span>
                    <span className="text-yellow-400">⭐ {book.rating}</span>
                </div>
                {!book.available && (
                    <p className="mt-2 text-xs text-red-400 font-medium">Out of Stock</p>
                )}
            </div>


           <BookDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} book={book} />

        </>
    );
};

export default BookCard;