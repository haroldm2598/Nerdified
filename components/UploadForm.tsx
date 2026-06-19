"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UploadSchema } from "@/lib/zod";
import { DEFAULT_VOICE } from "@/lib/constants";
import { BookUploadFormValues } from "@/types";

import { Form } from "@/components/ui/form";
import PdfUploadField from "./upload/PdfUploadField";
import CoverUploadField from "./upload/CoverUploadField";
import TextField from "./upload/TextField";
import VoiceSelector from "./upload/VoiceSelector";
import LoadingOverlay from "./upload/LoadingOverlay";

const UploadForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const pdfInputRef = useRef<HTMLInputElement | null>(null);
    const coverInputRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            pdfFile: undefined,
            coverImage: undefined,
            title: "",
            author: "",
            voice: DEFAULT_VOICE,
        },
    });

    const handleUpload = async (values: BookUploadFormValues) => {
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            console.log(values);
        } finally {
            setIsLoading(false);
        }
    };

    const clearFile = (
        fieldName: "pdfFile" | "coverImage",
        inputRef: React.RefObject<HTMLInputElement | null>,
    ) => {
        form.setValue(fieldName, undefined, {
            shouldValidate: true,
            shouldTouch: true,
        });

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="new-book-wrapper">
            <Form
                form={form}
                onSubmit={form.handleSubmit(handleUpload)}
                className="space-y-8"
            >
                <PdfUploadField
                    control={form.control}
                    inputRef={pdfInputRef}
                    clearFile={() => clearFile("pdfFile", pdfInputRef)}
                />

                <CoverUploadField
                    control={form.control}
                    inputRef={coverInputRef}
                    clearFile={() => clearFile("coverImage", coverInputRef)}
                />

                <TextField
                    control={form.control}
                    name="title"
                    label="Title"
                    placeholder="Rich Dad Poor Dad"
                />

                <TextField
                    control={form.control}
                    name="author"
                    label="Author Name"
                    placeholder="Robert Kiyosaki"
                />

                <VoiceSelector control={form.control} />

                <button type="submit" className="form-btn">
                    Begin Synthesis
                </button>
            </Form>

            <LoadingOverlay open={isLoading} />
        </div>
    );
};

export default UploadForm;
