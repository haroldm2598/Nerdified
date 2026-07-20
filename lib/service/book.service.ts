import { CreateBook } from "@/types";
import * as repository from "../repositories/book.repository";

export async function getBooks() {
    return repository.findAll();
}

export async function createBook(data: CreateBook) {
    // gawan ko muna ng repository tong function findByTitle
    // const existingBook = await repository.findByTitle(data.title);
    // if (existingBook) {
    //     throw new Error("A book with this title already exists.");
    // }
}
