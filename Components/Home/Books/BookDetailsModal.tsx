import { Dialog } from '@headlessui/react';
import {
    FaXmark,
    FaUser,
    FaBook,
    FaLanguage,
    FaBuilding,
    FaDollarSign,
    FaStar,
    FaBookOpen,
} from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaFileAlt, FaTimesCircle } from 'react-icons/fa';
import Image from 'next/image';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    cover_image: string;
    price: number;
    rating: number;
    category: string;
    publisher: string;
    language: string;
    pages: number;
    available: boolean;
    currency: string;
    edition?: string;
}

interface BookDetailsModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    book: Book;
}

const RESERVATION_KEY = 'library_reservations';

interface Reservation {
    bookId: number;
    reservedAt: number;
}

const getReservations = (): Reservation[] => {
    if (typeof window === 'undefined') return [];
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

const isExpired = (reservedAt: number) => {
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
    return Date.now() - reservedAt > THREE_DAYS;
};

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ isOpen, setIsOpen, book }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'description'>('details');
    const [isReserved, setIsReserved] = useState(false);

    useEffect(() => {
        let reservations = getReservations();
        reservations = reservations.filter(r => !isExpired(r.reservedAt));
        saveReservations(reservations);
        const reserved = reservations.some(r => r.bookId === book.id);
        setIsReserved(reserved);
    }, [book.id]);

    const handleReserve = () => {
        if (!book.available) return;

        let reservations = getReservations();

        if (reservations.some(r => r.bookId === book.id)) {
            alert('This book is already reserved.');
            return;
        }

        reservations.push({ bookId: book.id, reservedAt: Date.now() });
        saveReservations(reservations);
        setIsReserved(true);

        alert('Book reserved successfully for 3 days!');
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-100">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-2 overflow-y-auto">
                <Dialog.Panel className="relative max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-amber-200">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 md:top-4 right-2  md:right-4 text-gray-400 hover:text-amber-600 transition rounded-full border "
                        aria-label="Close"
                    >
                        <FaXmark className="w-6 h-6" />
                    </button>

                    <Dialog.Title className="flex items-center gap-3 px-4 pt-6 pb-3 text-xl md:text-2xl font-bold text-amber-700">
                        <FaBookOpen className="text-amber-600" />
                        {book.title}
                    </Dialog.Title>

                    <nav className="flex border-b border-gray-200 px-4 mb-4 select-none text-sm">
                        <button
                            className={`py-2 mr-6 font-semibold ${activeTab === 'details'
                                ? 'border-b-2 border-amber-600 text-amber-600'
                                : 'text-gray-500 hover:text-amber-600'
                                }`}
                            onClick={() => setActiveTab('details')}
                        >
                            Details
                        </button>
                        <button
                            className={`py-2 font-semibold ${activeTab === 'description'
                                ? 'border-b-2 border-amber-600 text-amber-600'
                                : 'text-gray-500 hover:text-amber-600'
                                }`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                    </nav>

                    <div className="px-4 pb-6 flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                            <Image
                                src={book.cover_image}
                                alt={book.title}
                                className="rounded-lg object-cover md:w-full md:h-fit"
                                loading="lazy"
                                width={120}
                                height={180}
                            />
                        </div>

                        <div className="w-full md:w-2/3 text-gray-800 text-sm space-y-4">
                            {activeTab === 'details' && (
                                <div className="bg-white rounded-2xl w-full space-y-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b pb-2">📘 Book Information</h2>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                        <InfoItem label="Author" value={book.author} icon={<FaUser />} />
                                        <InfoItem label="Category" value={book.category} icon={<FaBook />} />
                                        <InfoItem label="Publisher" value={book.publisher} icon={<FaBuilding />} />
                                        <InfoItem label="Language" value={book.language} icon={<FaLanguage />} />
                                        <InfoItem label="Edition" value={book.edition || 'N/A'} icon={<FaFileAlt />} />
                                        <InfoItem label="Pages" value={`${book.pages}`} icon={<FaFileAlt />} />
                                        <InfoItem label="Price" value={`$${book.price.toFixed(2)} ${book.currency}`} icon={<FaDollarSign />} />
                                        <InfoItem label="Rating" value={`${book.rating} / 5`} icon={<FaStar />} />
                                        <InfoItem
                                            label="Available"
                                            value={book.available ? 'Yes' : 'No'}
                                            icon={book.available ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                                            valueClass={book.available ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'description' && (
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-amber-50 px-4 py-4 text-right">
                        <button
                            disabled={!book.available || isReserved}
                            onClick={handleReserve}
                            className={`inline-block rounded-xl px-6 py-2 font-semibold cursor-pointer text-white shadow-md transition ${book.available && !isReserved
                                ? 'bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isReserved ? 'Reserved (3 days)' : book.available ? 'Reserve This Book' : 'Not Available'}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

interface InfoItemProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    valueClass?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon, valueClass }) => (
    <div className="flex items-start gap-2">
        <div className="text-amber-600 mt-1 text-lg md:text-2xl">{icon}</div>
        <div className='flex flex-col space-y-1'>
            <div className="text-sm md:text-xl uppercase text-gray-500">{label}</div>
            <div className={`text-sm font-medium ${valueClass || 'text-gray-800'}`}>{value}</div>
        </div>
    </div>
);

export default BookDetailsModal;
