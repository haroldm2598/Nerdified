import * as repository from "../repositories/upload.repository";

export async function getPosts() {
    return repository.findAll();
}
