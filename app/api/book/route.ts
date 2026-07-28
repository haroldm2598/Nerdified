import * as response from "@/utils/api-response";
import * as service from "@/lib/service/book.service";
import { UploadFormSchema } from "@/lib/validations/upload.validation";

// export async function GET() {
//     try {
//         const uploads = await
//     } catch(error) {

//     }
// }

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = UploadFormSchema.parse(body);

        const createPayload = {
            clerkId: "unknown",
            title: validated.title,
            author: validated.author,
            persona: undefined,
            fileURL: "",
            fileBlobKey: "",
            coverURL: validated.coverImage ? String(validated.coverImage) : "",
            coverBlobKey: undefined,
            fileSize: validated.pdfFile?.size ?? 0,
        };

        const bookCreated = await service.createBook(createPayload);

        return response.created(bookCreated);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
