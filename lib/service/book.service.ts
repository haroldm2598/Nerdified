import { CreateBook } from "@/types";
import * as repository from "../repositories/book.repository";
import { generateSlug } from "../utils";

export async function getBooks() {
    return repository.findAll();
}

export async function createBook(data: CreateBook) {
    const existingBook = await repository.findByTitle(data.title);

    if (existingBook) {
        throw new Error("A book with this title already exists.");
    }

    const slug = generateSlug(data.title);

    return repository.create({ ...data, slug, totalSegments: 0 });
}
