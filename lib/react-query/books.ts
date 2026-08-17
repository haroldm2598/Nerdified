import {
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { IBook } from "@/types";

export const bookKeys = {
    all: ["books"] as const,
    list: () => [...bookKeys.all, "list"] as const,
    detail: (slug: string) => [...bookKeys.all, "detail", slug] as const,
};

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
    const response = await fetch(input, {
        cache: "no-store",
        ...init,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Request failed.");
    }

    return (await response.json()) as T;
}

export const bookQueries = {
    list: () =>
        queryOptions({
            queryKey: bookKeys.list(),
            queryFn: () => fetchJson<IBook[]>("/api/book"),
            staleTime: 30_000,
        }),
    detail: (slug: string) =>
        queryOptions({
            queryKey: bookKeys.detail(slug),
            queryFn: () => fetchJson<IBook>(`/api/book/${slug}`),
            staleTime: 60_000,
        }),
};

export function useBooksQuery() {
    return useQuery(bookQueries.list());
}

export function useBookQuery(slug: string) {
    return useQuery({
        ...bookQueries.detail(slug),
        enabled: Boolean(slug),
    });
}

type BookDraft = {
    clerkId?: string;
    title: string;
    author: string;
    persona?: string;
    fileURL: string;
    fileBlobKey: string;
    coverURL?: string;
    coverBlobKey?: string | null;
    fileSize: number;
};

export function useCreateBookMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: BookDraft) =>
            fetchJson<IBook>("/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }),
        onMutate: async (newBook) => {
            await queryClient.cancelQueries({ queryKey: bookKeys.list() });

            const previousBooks = queryClient.getQueryData<IBook[]>(
                bookKeys.list(),
            );

            queryClient.setQueryData<IBook[]>(
                bookKeys.list(),
                (current = []) => [
                    {
                        ...newBook,
                        id: `temp-${Date.now()}`,
                        clerkId: "optimistic-user",
                        slug: newBook.title
                            .trim()
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]+/g, ""),
                        persona: newBook.persona ?? null,
                        coverURL: newBook.coverURL ?? "",
                        coverBlobKey: newBook.coverBlobKey ?? null,
                        fileSize: Number(newBook.fileSize ?? 0),
                        totalSegments: 0,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    } as IBook,
                    ...current,
                ],
            );

            return { previousBooks };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousBooks) {
                queryClient.setQueryData(
                    bookKeys.list(),
                    context.previousBooks,
                );
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: bookKeys.list() });
        },
    });
}

export function useDeleteBookMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (slug: string) =>
            fetchJson<{ success: boolean; message: string }>("/api/book", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug }),
            }),
        onMutate: async (slug) => {
            await queryClient.cancelQueries({ queryKey: bookKeys.list() });

            const previousBooks = queryClient.getQueryData<IBook[]>(
                bookKeys.list(),
            );

            queryClient.setQueryData<IBook[]>(bookKeys.list(), (current = []) =>
                current.filter((book) => book.slug !== slug),
            );

            return { previousBooks };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousBooks) {
                queryClient.setQueryData(
                    bookKeys.list(),
                    context.previousBooks,
                );
            }
        },
        onSettled: (_data, _error, slug) => {
            if (slug) {
                queryClient.invalidateQueries({
                    queryKey: bookKeys.detail(slug),
                });
            }
            queryClient.invalidateQueries({ queryKey: bookKeys.list() });
        },
    });
}
