"use client";

import { useEffect, useState } from "react";

interface PostProps {
    id: string;
    title: string;
    content: string;
}

const page = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [limit, setLimit] = useState<number>(5);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/post`);
            const post = await response.json();

            setPosts(post.data);
            console.log("From serverState:", post.data);
        };

        fetchData();
    }, [limit]);

    useEffect(() => {
        console.log("From useState:", posts);
    }, [posts]);

    return (
        <div className="wrapper container">
            {posts.map((post) => {
                return (
                    <div key={post.id} className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            Title: {post.title}
                        </h2>
                        <p className="text-lg font-medium">
                            content: {post.content}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default page;
