"use client";

import * as React from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadCloud, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "./ui/form";

const UploadFormSchema = z.object({
    pdfFile: z
        .any()
        .refine((value) => value instanceof File, {
            message: "PDF file is required",
        })
        .refine((value) => value?.type === "application/pdf", {
            message: "Please upload a PDF file",
        }),
    coverImage: z
        .any()
        .optional()
        .refine((value) => !value || value instanceof File, {
            message: "Invalid cover image",
        })
        .refine((value) => !value || value?.type?.startsWith("image/"), {
            message: "Cover image must be an image file",
        }),
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author name is required"),
    voice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"]),
});

type UploadFormValues = z.infer<typeof UploadFormSchema>;

const voiceGroups = [
    {
        label: "Male Voices",
        options: [
            {
                id: "dave",
                title: "Dave",
                description:
                    "Young male, British-Essex, casual & conversational",
            },
            {
                id: "daniel",
                title: "Daniel",
                description:
                    "Middle-aged male, British, authoritative but warm",
            },
            {
                id: "chris",
                title: "Chris",
                description: "Male, casual & easy-going",
            },
        ],
    },
    {
        label: "Female Voices",
        options: [
            {
                id: "rachel",
                title: "Rachel",
                description: "Young female, American, calm & clear",
            },
            {
                id: "sarah",
                title: "Sarah",
                description: "Young female, American, soft & approachable",
            },
        ],
    },
];

function LoadingOverlay() {
    return (
        <div className="loading-wrapper" role="status" aria-live="polite">
            <div className="loading-shadow-wrapper shadow-soft-lg bg-white">
                <div className="loading-shadow">
                    <div className="loading-animation">
                        <UploadCloud className="w-14 h-14 text-[#663820]" />
                    </div>
                    <div className="loading-title">Beginning synthesis</div>
                    <div className="loading-progress">
                        <div className="loading-progress-item">
                            <span className="loading-progress-status" />
                            <span>Uploading PDF and cover art</span>
                        </div>
                        <div className="loading-progress-item">
                            <span className="loading-progress-status" />
                            <span>Preparing the literary voice</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const UploadForm = () => {
    const pdfInputRef = React.useRef<HTMLInputElement | null>(null);
    const coverInputRef = React.useRef<HTMLInputElement | null>(null);

    const form = useForm<UploadFormValues>({
        resolver: zodResolver(UploadFormSchema),
        defaultValues: {
            pdfFile: undefined,
            coverImage: undefined,
            title: "",
            author: "",
            voice: "rachel",
        },
        mode: "onTouched",
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
    } = form;

    const clearFile = (
        fieldName: "pdfFile" | "coverImage",
        inputRef: React.RefObject<HTMLInputElement>,
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

    return (
        <div className="new-book-wrapper">
            <Form
                form={form}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={control}
                    name="pdfFile"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            UploadFormValues,
                            "pdfFile"
                        >;
                    }) => (
                        <FormItem>
                            <FormLabel htmlFor="pdfFile">
                                PDF file upload
                            </FormLabel>
                            <FormControl>
                                <label
                                    htmlFor="pdfFile"
                                    className={cn(
                                        "upload-dropzone border border-dashed border-[var(--border-subtle)]",
                                        field.value &&
                                            "upload-dropzone-uploaded",
                                    )}
                                >
                                    <UploadCloud className="upload-dropzone-icon" />
                                    {field.value ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="upload-dropzone-text">
                                                {field.value.name}
                                            </span>
                                            <button
                                                type="button"
                                                className="upload-dropzone-remove"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    clearFile(
                                                        "pdfFile",
                                                        pdfInputRef,
                                                    );
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <span className="upload-dropzone-hint">
                                                PDF file (max 50MB)
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="upload-dropzone-text">
                                                Click to upload PDF
                                            </span>
                                            <span className="upload-dropzone-hint">
                                                PDF file (max 50MB)
                                            </span>
                                        </>
                                    )}
                                </label>
                                <input
                                    id="pdfFile"
                                    type="file"
                                    accept="application/pdf"
                                    className="sr-only"
                                    ref={pdfInputRef}
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.pdfFile?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="coverImage"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            UploadFormValues,
                            "coverImage"
                        >;
                    }) => (
                        <FormItem>
                            <FormLabel htmlFor="coverImage">
                                Cover image upload
                            </FormLabel>
                            <FormControl>
                                <label
                                    htmlFor="coverImage"
                                    className={cn(
                                        "upload-dropzone border border-dashed border-[var(--border-subtle)]",
                                        field.value &&
                                            "upload-dropzone-uploaded",
                                    )}
                                >
                                    <Image className="upload-dropzone-icon" />
                                    {field.value ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="upload-dropzone-text">
                                                {field.value.name}
                                            </span>
                                            <button
                                                type="button"
                                                className="upload-dropzone-remove"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    clearFile(
                                                        "coverImage",
                                                        coverInputRef,
                                                    );
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <span className="upload-dropzone-hint">
                                                Leave empty to auto-generate
                                                from PDF
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="upload-dropzone-text">
                                                Click to upload cover image
                                            </span>
                                            <span className="upload-dropzone-hint">
                                                Leave empty to auto-generate
                                                from PDF
                                            </span>
                                        </>
                                    )}
                                </label>
                                <input
                                    id="coverImage"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    ref={coverInputRef}
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage>
                                {errors.coverImage?.message}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="title"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<UploadFormValues, "title">;
                    }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormControl>
                                <input
                                    id="title"
                                    className="form-input"
                                    placeholder="ex: Rich Dad Poor Dad"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.title?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="author"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<
                            UploadFormValues,
                            "author"
                        >;
                    }) => (
                        <FormItem>
                            <FormLabel htmlFor="author">Author Name</FormLabel>
                            <FormControl>
                                <input
                                    id="author"
                                    className="form-input"
                                    placeholder="ex: Robert Kiyosaki"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.author?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="voice"
                    render={({
                        field,
                    }: {
                        field: ControllerRenderProps<UploadFormValues, "voice">;
                    }) => (
                        <FormItem>
                            <FormLabel>Choose Assistant Voice</FormLabel>
                            <FormControl>
                                <div className="space-y-6">
                                    {voiceGroups.map((group) => (
                                        <div
                                            key={group.label}
                                            className="space-y-3"
                                        >
                                            <div className="text-sm font-medium text-[#3d485e]">
                                                {group.label}
                                            </div>
                                            <div className="voice-selector-options flex-wrap gap-3">
                                                {group.options.map((option) => {
                                                    const selected =
                                                        field.value ===
                                                        option.id;
                                                    return (
                                                        <label
                                                            key={option.id}
                                                            className={cn(
                                                                "voice-selector-option w-full sm:w-auto",
                                                                selected
                                                                    ? "voice-selector-option-selected"
                                                                    : "voice-selector-option-default",
                                                            )}
                                                        >
                                                            <input
                                                                type="radio"
                                                                className="sr-only"
                                                                name="voice"
                                                                value={
                                                                    option.id
                                                                }
                                                                checked={
                                                                    selected
                                                                }
                                                                onChange={() =>
                                                                    field.onChange(
                                                                        option.id,
                                                                    )
                                                                }
                                                            />
                                                            <div className="text-left">
                                                                <p className="text-base font-semibold text-[#212a3b]">
                                                                    {
                                                                        option.title
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-[#5a5a5a] leading-6">
                                                                    {
                                                                        option.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage>{errors.voice?.message}</FormMessage>
                        </FormItem>
                    )}
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
