"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Image, X } from "lucide-react";
import { Form } from "./ui/form";

import {
    UploadFormSchema,
    UploadFormValues,
} from "@/lib/validations/upload.validation";
import { getFieldErrorMessage } from "@/lib/validations/uploadError.validation";

import LoadingOverlay from "./LoadingOverlay";
import { DEFAULT_VOICE } from "@/lib/constants";
import {
    FileUploadField,
    TextInputField,
    VoiceSelectorField,
} from "./uploadComponents";

const UploadForm = () => {
    const pdfInputRef = React.useRef<HTMLInputElement>(null);
    const coverInputRef = React.useRef<HTMLInputElement>(null);

    const form = useForm<UploadFormValues>({
        resolver: async (values) => {
            const result = UploadFormSchema.safeParse(values);

            if (result.success) {
                return {
                    values: result.data,
                    errors: {},
                };
            }

            const errors = result.error.issues.reduce<
                Record<string, { type: string; message: string }>
            >((acc, issue) => {
                const path = issue.path.join(".");

                if (path) {
                    acc[path] = {
                        type: issue.code,
                        message: issue.message,
                    };
                }

                return acc;
            }, {});

            return {
                values: {},
                errors,
            };
        },
        defaultValues: {
            pdfFile: undefined,
            coverImage: undefined,
            title: "",
            author: "",
            voice: DEFAULT_VOICE,
        },
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
    } = form;

    const clearFile = (
        fieldName: "pdfFile" | "coverImage",
        inputRef: React.MutableRefObject<HTMLInputElement | null>,
    ) => {
        setValue(fieldName, undefined, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const onSubmit = async (values: UploadFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submitted book upload:", values);
    };

    const pdfErrorMessage = getFieldErrorMessage(errors.pdfFile);
    const coverErrorMessage = getFieldErrorMessage(errors.coverImage);
    const titleErrorMessage = getFieldErrorMessage(errors.title);
    const authorErrorMessage = getFieldErrorMessage(errors.author);
    const voiceErrorMessage = getFieldErrorMessage(errors.voice);

    return (
        <div className="new-book-wrapper">
            <Form
                form={form}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FileUploadField
                    control={control}
                    name="pdfFile"
                    label="PDF file upload"
                    inputId="pdfFile"
                    accept="application/pdf"
                    icon={UploadCloud}
                    placeholderText="Click to upload PDF"
                    hintText="PDF file (max 50MB)"
                    inputRef={pdfInputRef}
                    clearFile={clearFile}
                    errorMessage={pdfErrorMessage}
                />

                <FileUploadField
                    control={control}
                    name="coverImage"
                    label="Cover image upload"
                    inputId="coverImage"
                    accept="image/*"
                    icon={Image}
                    placeholderText="Click to upload cover image"
                    hintText="Leave empty to auto-generate from PDF"
                    inputRef={coverInputRef}
                    clearFile={clearFile}
                    errorMessage={coverErrorMessage}
                />

                <TextInputField
                    control={control}
                    name="title"
                    label="Title"
                    inputId="title"
                    placeholder="ex: Rich Dad Poor Dad"
                    errorMessage={titleErrorMessage}
                />

                <TextInputField
                    control={control}
                    name="author"
                    label="Author Name"
                    inputId="author"
                    placeholder="ex: Robert Kiyosaki"
                    errorMessage={authorErrorMessage}
                />

                <VoiceSelectorField
                    control={control}
                    errorMessage={voiceErrorMessage}
                />

                <button
                    type="submit"
                    className="form-btn"
                    disabled={isSubmitting}
                >
                    Begin Synthesis
                </button>
            </Form>

            {isSubmitting && <LoadingOverlay />}
        </div>
    );
};

export default UploadForm;
