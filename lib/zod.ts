import { z } from "zod";
import {
    ACCEPTED_IMAGE_TYPES,
    ACCEPTED_PDF_TYPES,
    DEFAULT_VOICE,
    MAX_FILE_SIZE,
    MAX_IMAGE_SIZE,
    voiceCategories,
} from "@/lib/constants";

const voiceKeys = [...voiceCategories.male, ...voiceCategories.female] as const;

const isFile = (value: unknown): value is File =>
    typeof File !== "undefined" && value instanceof File;

export const UploadSchema = z.object({
    pdfFile: z.any().superRefine((value, ctx) => {
        if (!isFile(value)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please upload a PDF file.",
            });
            return;
        }

        if (!ACCEPTED_PDF_TYPES.includes(value.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Only PDF files are accepted.",
            });
            return;
        }

        if (value.size > MAX_FILE_SIZE) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "PDF must be 50MB or smaller.",
            });
        }
    }),
    coverImage: z
        .any()
        .optional()
        .superRefine((value, ctx) => {
            if (value === undefined) {
                return;
            }

            if (!isFile(value)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Cover image must be jpeg, png, or webp.",
                });
                return;
            }

            if (!ACCEPTED_IMAGE_TYPES.includes(value.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Cover image must be jpeg, png, or webp.",
                });
                return;
            }

            if (value.size > MAX_IMAGE_SIZE) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Cover image must be 10MB or smaller.",
                });
            }
        }),
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(120, "Title is too long."),
    author: z
        .string()
        .trim()
        .min(1, "Author name is required")
        .max(80, "Author name is too long."),
    voice: z.enum(voiceKeys).default(DEFAULT_VOICE),
});
