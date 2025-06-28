// hooks/useBookSearch.ts
import { Book } from "@/Data/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useBookSearch = (search: string, page: number) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/books?search=${search}&page=${page}`
        );
        setBooks(res.data?.jsonResponse || []);
      } catch (error) {
        toast.error(`Search error :  ${error}`);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, page]);

  return { books, loading };
};
