import { Control } from "react-hook-form";

import {
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { BookUploadFormValues } from "@/types";
import { voiceCategories, voiceOptions } from "@/lib/constants";

import { cn } from "@/lib/utils";

const voiceSections = [
    {
        label: "Male Voices",
        keys: voiceCategories.male,
    },
    {
        label: "Female Voices",
        keys: voiceCategories.female,
    },
] as const;

interface Props {
    control: Control<BookUploadFormValues>;
}

const VoiceSelector = ({ control }: Props) => {
    return (
        <FormField
            control={control}
            name="voice"
            render={({ field, fieldState }) => (
                <FormItem>
                    <div className="flex flex-col gap-2">
                        <FormLabel>Choose Assistant Voice</FormLabel>

                        <FormDescription>
                            Choose a warm literary voice for your synthesis.
                        </FormDescription>
                    </div>

                    <div className="space-y-6">
                        {voiceSections.map((section) => (
                            <div key={section.label} className="space-y-3">
                                <p className="text-base font-semibold text-[var(--text-primary)]">
                                    {section.label}
                                </p>

                                <div className="voice-selector-options">
                                    {section.keys.map((voiceKey) => {
                                        const voice = voiceOptions[voiceKey];

                                        const selected =
                                            field.value === voiceKey;

                                        return (
                                            <label
                                                key={voiceKey}
                                                className={cn(
                                                    "voice-selector-option",
                                                    selected
                                                        ? "voice-selector-option-selected"
                                                        : "voice-selector-option-default",
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    className="sr-only"
                                                    checked={selected}
                                                    onChange={() =>
                                                        field.onChange(voiceKey)
                                                    }
                                                />

                                                <div className="text-left">
                                                    <p className="font-semibold">
                                                        {voice.name}
                                                    </p>

                                                    <p className="text-sm text-[var(--text-secondary)]">
                                                        {voice.description}
                                                    </p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default VoiceSelector;
