import { Control } from "react-hook-form";
import { ImageIcon } from "lucide-react";

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { BookUploadFormValues } from "@/types";
import FileUploadDropzone from "./FileUploadDropzone";

interface Props {
    control: Control<BookUploadFormValues>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    clearFile: () => void;
}

const CoverUploadField = ({ control, inputRef, clearFile }: Props) => {
    return (
        <FormField
            control={control}
            name="coverImage"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>Cover Image Upload</FormLabel>

                    <FileUploadDropzone
                        id="coverImage"
                        icon={<ImageIcon className="upload-dropzone-icon" />}
                        file={field.value}
                        accept="image/jpeg,image/png,image/webp"
                        label="Click to upload cover image"
                        hint="Leave empty to auto-generate from PDF"
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

export default CoverUploadField;
