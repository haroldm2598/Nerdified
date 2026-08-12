import z from "zod";
import * as response from "@/utils/api-response";
import * as service from "@/lib/service/book.service";
import { CreateBookPayloadSchema } from "@/lib/validations/upload.validation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getSubscriptionPlanFromUser } from "@/lib/constant/subscription-utils";

export async function GET() {
    try {
        const books = await service.getBooks();

        const serializedBooks = JSON.parse(
            JSON.stringify(books, (_, value) =>
                typeof value === "bigint" ? value.toString() : value,
            ),
        );

        return response.ok(serializedBooks);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}

export async function POST(request: Request) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            return response.badRequest(
                "Unauthorized: Please sign in to upload a book.",
            );
        }

        const body = await request.json();
        const validated = CreateBookPayloadSchema.parse(body);
        const plan = await getSubscriptionPlanFromUser();

        const createPayload = {
            clerkId: user.id,
            title: validated.title,
            author: validated.author,
            persona: validated.persona,
            fileURL: validated.fileURL,
            fileBlobKey: validated.fileBlobKey,
            coverURL: validated.coverURL ?? "",
            coverBlobKey: validated.coverBlobKey,
            fileSize: validated.fileSize,
        };

        const bookCreated = await service.createBook(createPayload, plan);
        const safeBookResponse = {
            ...bookCreated,
            fileSize: Number(bookCreated.fileSize),
        };

        return response.created(safeBookResponse);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return response.badRequest(
                error.issues.map((issue) => issue.message).join(", "),
            );
        }

        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
