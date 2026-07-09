"use client";

import type { Control, ControllerRenderProps } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import type { UploadFormValues } from "@/lib/validations/upload.validation";

type TextFieldName = "title" | "author";

interface TextInputFieldProps {
    control: Control<UploadFormValues>;
    name: TextFieldName;
    label: string;
    placeholder: string;
    inputId: string;
    errorMessage?: string;
}

const TextInputField = ({
    control,
    name,
    label,
    placeholder,
    inputId,
    errorMessage,
}: TextInputFieldProps) => {
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
                        <input
                            id={inputId}
                            className="form-input"
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage>{errorMessage}</FormMessage>
                </FormItem>
            )}
        />
    );
};

export default TextInputField;
