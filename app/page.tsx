import TestCard from "@/components/TestCard";

export default function Home() {
    return (
        <section className="min-h-screen min-w-screen bg-amber-50 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <TestCard
                    title="Testing Card 1"
                    desc="This is a simple test card."
                    action="Click me!"
                    content="This is the content of the test card."
                    footer="This is the footer of the test card."
                />

                <TestCard
                    title="Testing Card 2"
                    desc="This is a simple test card."
                    action="Click me!"
                    content="This is the content of the test card."
                    footer="This is the footer of the test card."
                />
            </div>
        </section>
    );
}
