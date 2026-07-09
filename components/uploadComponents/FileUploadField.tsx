"use client";

import * as React from "react";
import type { Control, ControllerRenderProps } from "react-hook-form";
import { UploadCloud, X, type LucideIcon } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { UploadFormValues } from "@/lib/validations/upload.validation";

type FileFieldName = "pdfFile" | "coverImage";

interface FileUploadFieldProps {
    control: Control<UploadFormValues>;
    name: FileFieldName;
    label: string;
    inputId: string;
    accept: string;
    icon: LucideIcon;
    placeholderText: string;
    hintText: string;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    clearFile: (
        fieldName: FileFieldName,
        inputRef: React.MutableRefObject<HTMLInputElement | null>,
    ) => void;
    errorMessage?: string;
}

const FileUploadField = ({
    control,
    name,
    label,
    inputId,
    accept,
    icon: Icon,
    placeholderText,
    hintText,
    inputRef,
    clearFile,
    errorMessage,
}: FileUploadFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({
                field,
            }: {
                field: ControllerRenderProps<UploadFormValues, typeof name>;
            }) => (
                <FormItem>
                    <FormLabel htmlFor={inputId}>{label}</FormLabel>
                    <FormControl>
                        <div>
                            <label
                                htmlFor={inputId}
                                className={cn(
                                    "upload-dropzone border border-dashed border-(--border-subtle)",
                                    field.value && "upload-dropzone-uploaded",
                                )}
                            >
                                <Icon className="upload-dropzone-icon" />
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
                                                clearFile(name, inputRef);
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <span className="upload-dropzone-hint">
                                            {hintText}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="upload-dropzone-text">
                                            {placeholderText}
                                        </span>
                                        <span className="upload-dropzone-hint">
                                            {hintText}
                                        </span>
                                    </>
                                )}
                            </label>
                            <input
                                id={inputId}
                                type="file"
                                accept={accept}
                                className="sr-only"
                                ref={inputRef}
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    field.onChange(file);
                                }}
                            />
                        </div>
                    </FormControl>
                    <FormMessage>{errorMessage}</FormMessage>
                </FormItem>
            )}
        />
    );
};

export default FileUploadField;
