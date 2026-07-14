import * as repository from "../repositories/post.repository";

export async function getPosts() {
    return repository.findAll();
}
