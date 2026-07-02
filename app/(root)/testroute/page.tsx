import { testContent } from "@/lib/api/testContent";

const page = async () => {
    const postContent = await testContent();

    return (
        <div className="wrapper container">
            {postContent.data.map((post: any) => (
                <div key={post.id} className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                        Title: {post.title}
                    </h2>
                    <p className="text-lg font-medium">
                        content: {post.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default page;
