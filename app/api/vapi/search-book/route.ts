import * as response from "@/utils/api-response";
import * as service from "@/lib/service/book.service";

function extractToolCallParameters(rawBody: unknown) {
    if (!rawBody || typeof rawBody !== "object") {
        return null;
    }

    const body = rawBody as Record<string, unknown>;

    if (
        typeof body.parameters === "object" &&
        body.parameters &&
        !Array.isArray(body.parameters)
    ) {
        return body.parameters as Record<string, unknown>;
    }

    if (
        typeof body.input === "object" &&
        body.input &&
        !Array.isArray(body.input)
    ) {
        return body.input as Record<string, unknown>;
    }

    return null;
}

function extractValue(parameters: Record<string, unknown> | null, key: string) {
    if (!parameters) return null;

    const value = parameters[key];

    if (typeof value === "string") {
        return value.trim();
    }

    if (typeof value === "number") {
        return String(value);
    }

    return null;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parameters = extractToolCallParameters(body);

        const callName =
            typeof body?.name === "string"
                ? body.name
                : typeof body?.callName === "string"
                  ? body.callName
                  : "";

        if (callName.toLowerCase() !== "search book") {
            return response.badRequest("Unsupported Vapi tool call");
        }

        const bookId =
            extractValue(parameters, "bookId") ||
            extractValue(parameters, "book_id");
        const query =
            extractValue(parameters, "query") ||
            extractValue(parameters, "question");

        if (!bookId || !query) {
            return response.badRequest("Missing book ID or query");
        }

        const segments = await service.searchBookSegments(bookId, query, 3);

        if (!segments.length) {
            return response.ok("No information found about this topic.");
        }

        const combinedResult = segments
            .map((segment) => {
                const content =
                    typeof segment.content === "string"
                        ? segment.content.trim()
                        : "";
                return content ? content : "";
            })
            .filter(Boolean)
            .join("\n\n");

        return response.ok(
            combinedResult || "No information found about this topic.",
        );
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
