import { books } from "@/Data/data";

export function updateBookAvailability(bookId: number, isAvailable: boolean) {
  return books.map(book => {
    if (book.id === bookId) {
      return { ...book, available: isAvailable };
    }    
    return book;
  });
}