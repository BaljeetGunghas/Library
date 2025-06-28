import { books } from "@/Data/data";

export function updateBookAvailability(bookId: string, isAvailable: boolean) {
  return books.map(book => {
    if (String(book.id) === bookId) {
      return { ...book, available: isAvailable };
    }    
    return book;
  });
}