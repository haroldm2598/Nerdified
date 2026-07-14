import * as response from "@/utils/api-response";
import * as service from "@/lib/service/post.service";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const posts = await prisma.post.findMany();

        const serialized = JSON.parse(
            JSON.stringify(posts, (_, value) =>
                typeof value === "bigint" ? value.toString() : value,
            ),
        );

        return NextResponse.json({ data: serialized });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}

// Empty yung result
// export async function GET() {
//     try {
//         const posts = await service.getPosts();

//         return response.ok(posts);
//     } catch (error) {
//         return response.serverError();
//     }
// }
