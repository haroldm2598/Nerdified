import { CreateBook } from "@/types";
import * as repository from "../repositories/book.repository";
import { generateSlug } from "../utils";
import {
    getPlanLimits,
    type SubscriptionPlan,
} from "../constant/subscription-constants";

export async function getBooks() {
    return repository.findAll();
}

export async function getBookBySlug(slug: string) {
    return repository.findBySlug(slug);
}

export async function createBook(data: CreateBook, plan: SubscriptionPlan) {
    const existingBook = await repository.findByTitle(data.title);

    if (existingBook) {
        throw new Error("A book with this title already exists.");
    }

    const limits = getPlanLimits(plan);
    const bookCount = await repository.countByClerkId(data.clerkId);

    if (bookCount >= limits.maxBooks) {
        throw new Error(
            `You have reached the ${limits.label} plan limit of ${limits.maxBooks} book uploads. Upgrade to add more books.`,
        );
    }

    const slug = generateSlug(data.title);
    const createData = {
        ...data,
        coverURL: data.coverURL ?? "",
        coverBlobKey: data.coverBlobKey ?? undefined,
        fileSize: Number(data.fileSize),
    };

    return repository.create({ ...createData, slug, totalSegments: 0 });
}

export async function deleteBook(slug: string, clerkId: string) {
    const existingBook = await repository.findBySlug(slug);

    if (!existingBook) {
        throw new Error("Book not found.");
    }

    if (existingBook.clerkId !== clerkId) {
        throw new Error("You are not allowed to delete this book.");
    }

    return repository.deleteBySlug(slug);
}

export async function searchBookSegments(
    bookId: string,
    query: string,
    segmentCount = 3,
) {
    if (!bookId?.trim() || !query?.trim()) {
        return [];
    }

    return repository.searchBookSegments(bookId, query, segmentCount);
}
