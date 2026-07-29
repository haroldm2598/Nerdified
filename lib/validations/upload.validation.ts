// dine naman nilalagay yung mga Zod validation schemas dito para ma-separate yung validation logic sa component logic.

import z from "zod";

export const UploadFormSchema = z.object({
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
    title: z.string().trim().min(1, "Title is required"),
    author: z.string().trim().min(1, "Author name is required"),
    persona: z.enum(["dave", "daniel", "chris", "rachel", "sarah"]),
});

export type UploadFormValues = z.infer<typeof UploadFormSchema>;
