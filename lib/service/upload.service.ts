import * as repository from "../repositories/upload.repository";

export async function getUploads() {
    return repository.findAll();
}
