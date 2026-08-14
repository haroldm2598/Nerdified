import ProtectedPage from "@/components/ProtectedPage";
import UploadForm from "@/components/UploadForm";

const page = () => {
    return (
        <ProtectedPage>
            <main className="wrapper container">
                <div className="mx-auto max-w-180 space-y-10">
                    <section className="flex flex-col gap-5">
                        <h1 className="page-title-xl">Add a New Book</h1>
                    </section>

                    <UploadForm />
                </div>
            </main>
        </ProtectedPage>
    );
};

export default page;
