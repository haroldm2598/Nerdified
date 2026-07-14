import { NextResponse } from "next/server";

export function ok(data: unknown) {
    return NextResponse.json(data, { status: 200 });
}

export function created(data: unknown) {
    return NextResponse.json(data, { status: 201 });
}

export function badRequest(message: string) {
    return NextResponse.json({ message }, { status: 400 });
}

export function notFound(message: string) {
    return NextResponse.json({ message }, { status: 404 });
}

export function serverError(message = "An internal server error occurred") {
    return NextResponse.json({ message }, { status: 500 });
}
