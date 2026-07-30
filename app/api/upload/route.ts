import * as response from "@/utils/api-response";
import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@clerk/nextjs/server";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobToken) {
            throw new Error(
                "Missing BLOB_READ_WRITE_TOKEN. Add it to your environment and restart the server.",
            );
        }

        const jsonResponse = await handleUpload({
            token: blobToken,
            body,
            request,
            onBeforeGenerateToken: async () => {
                try {
                    const { userId } = await auth();

                    if (!userId) {
                        throw new Error(
                            "Unauthorized: User must be signed in to upload files.",
                        );
                    }

                    return {
                        allowedContentTypes: [
                            "application/pdf",
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                        ],
                        addRandomSuffix: true,
                        maximumSizeInBytes: MAX_FILE_SIZE,
                        tokenPayload: JSON.stringify({ userId }),
                    };
                } catch (error) {
                    throw new Error(
                        `Failed to generate upload token: ${error instanceof Error ? error.message : "Unknown auth error"}`,
                    );
                }
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log("File uploaded to blob", blob.url);

                const payload = tokenPayload ? JSON.parse(tokenPayload) : null;
                const userId = payload?.userId;
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
