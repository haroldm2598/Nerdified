"use client";

import type { Control, ControllerRenderProps } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { voiceGroups } from "@/lib/constant/constants";
import type { UploadFormValues } from "@/lib/validations/upload.validation";

interface VoiceSelectorFieldProps {
    control: Control<UploadFormValues>;
    errorMessage?: string;
}

const VoiceSelectorField = ({
    control,
    errorMessage,
}: VoiceSelectorFieldProps) => {
    return (
        <FormField
            control={control}
            name="persona"
            render={({
                field,
            }: {
                field: ControllerRenderProps<UploadFormValues, "persona">;
            }) => (
                <FormItem>
                    <FormLabel>Choose Assistant Voice</FormLabel>
                    <FormControl>
                        <div className="space-y-6">
                            {voiceGroups.map((group) => (
                                <div key={group.label} className="space-y-3">
                                    <div className="text-sm font-medium text-[#3d485e]">
                                        {group.label}
                                    </div>
                                    <div className="voice-selector-options flex-wrap gap-3">
                                        {group.options.map((option) => {
                                            const selected =
                                                field.value === option.value;

                                            return (
                                                <label
                                                    key={option.value}
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
                                                        value={option.value}
                                                        checked={selected}
                                                        onChange={() =>
                                                            field.onChange(
                                                                option.value,
                                                            )
                                                        }
                                                    />
                                                    <div className="text-left">
                                                        <p className="text-base font-semibold text-[#212a3b]">
                                                            {option.title}
                                                        </p>
                                                        <p className="text-sm text-[#5a5a5a] leading-6">
                                                            {option.description}
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
                    <FormMessage>{errorMessage}</FormMessage>
                </FormItem>
            )}
        />
    );
};

export default VoiceSelectorField;
