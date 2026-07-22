// import * as reponse from '@/utils/api-response'

import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const uploads = await
//     } catch(error) {

//     }
// }

export async function GET() {
    return NextResponse.json({ message: "Hello from the API route!" });
}
