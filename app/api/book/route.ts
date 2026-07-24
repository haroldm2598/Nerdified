import * as response from "@/utils/api-response";
import * as service from "@/lib/service/post.service";
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
        const bookCreated = await service.createBook(validated);

        return response.created(bookCreated);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
