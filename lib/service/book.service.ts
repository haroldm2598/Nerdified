import { CreateBook } from "@/types";
import * as repository from "../repositories/book.repository";
import { generateSlug } from "../utils";

export async function getBooks() {
    return repository.findAll();
}

export async function getBookBySlug(slug: string) {
    return repository.findBySlug(slug);
}

export async function createBook(data: CreateBook) {
    const existingBook = await repository.findByTitle(data.title);

    if (existingBook) {
        throw new Error("A book with this title already exists.");
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
