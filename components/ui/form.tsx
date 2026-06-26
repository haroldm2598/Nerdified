"use client";

import * as React from "react";
import {
    Controller,
    type Control,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormProps<
    T extends FieldValues,
> extends React.FormHTMLAttributes<HTMLFormElement> {
    form: UseFormReturn<T>;
}

function Form<T extends FieldValues>({ className, ...props }: FormProps<T>) {
    return <form className={cn(className)} noValidate {...props} />;
}

function FormField<T extends FieldValues>({
    control,
    name,
    defaultValue,
    render,
}: {
    control: Control<T>;
    name: FieldPath<T>;
    defaultValue?: unknown;
    render: (props: any) => React.ReactNode;
}) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={render}
        />
    );
}

function FormItem({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("space-y-2", className)} {...props} />;
}

function FormLabel({
    className,
    ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={cn("form-label", className)} {...props} />;
}

function FormControl({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn(className)} {...props} />;
}

function FormDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-sm text-(--text-secondary)", className)}
            {...props}
        />
    );
}

function FormMessage({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-sm text-red-600 mt-1", className)} {...props} />
    );
}

export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
};
