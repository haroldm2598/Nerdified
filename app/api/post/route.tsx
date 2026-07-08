// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

// export async function GET() {
//     const cookieStore = await cookies();
//     const supabase = createClient(cookieStore);

//     const { data, error } = await supabase.from("post").select("*");

//     if (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ data });
// }

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
