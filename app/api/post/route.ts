import * as response from "@/utils/api-response";
import * as service from "@/lib/service/post.service";

// Empty yung result * sa service lang pala ako may maling
export async function GET() {
    try {
        const posts = await service.getPosts();
        const serialized = JSON.parse(
            JSON.stringify(posts, (_, value) =>
                typeof value === "bigint" ? value.toString() : value,
            ),
        );

        return response.ok(serialized);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
