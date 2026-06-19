import { Control } from "react-hook-form";
import { UploadCloud } from "lucide-react";

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import FileUploadDropzone from "./FileUploadDropzone";
import { BookUploadFormValues } from "@/types";

interface Props {
    control: Control<BookUploadFormValues>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    clearFile: () => void;
}

const PdfUploadField = ({ control, inputRef, clearFile }: Props) => {
    return (
        <FormField
            control={control}
            name="pdfFile"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>PDF Upload</FormLabel>

                    <FileUploadDropzone
                        id="pdfFile"
                        icon={<UploadCloud />}
                        file={field.value}
                        accept="application/pdf"
                        label="Click to upload PDF"
                        hint="PDF file (max 50MB)"
                        error={fieldState.error?.message}
                        inputRef={inputRef}
                        onChange={field.onChange}
                        onRemove={() => {
                            clearFile();
                            field.onChange(undefined);
                        }}
                    />

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PdfUploadField;
