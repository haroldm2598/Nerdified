import { Control, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface TextFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder: string;
    type?: string;
}

const TextField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
}: TextFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel
                        className={cn(fieldState.error && "text-red-700")}
                    >
                        {label}
                    </FormLabel>

                    <FormControl>
                        <input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className={cn(
                                "form-input",
                                fieldState.error
                                    ? "border border-red-500 text-red-700 placeholder:text-red-300 ring-1 ring-red-500"
                                    : "border border-transparent focus:border-[var(--color-brand)]",
                            )}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextField;
