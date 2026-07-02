export async function testContent() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/post`,
        {
            method: "GET",
            cache: "no-store",
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
    }

    return response.json();
}
