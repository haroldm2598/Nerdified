"use client";
import { useFetchAPI } from "@/lib/api/useFetchApi";

interface PostProps {
    id: string;
    title: string;
    content: string;
}

const page = () => {
    const { data: posts } = useFetchAPI<PostProps[]>("/api/post");

    return (
        <div className="wrapper container">
            {posts?.map((post) => {
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
