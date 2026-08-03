import React from "react";

interface SlugProps {
    params: Promise<{ slug: string }>;
}

export default async function page({ params }: SlugProps) {
    const { slug } = await params;
    return <div>This is the page of {slug}</div>;
}
