import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    id: string;
    icon: React.ReactNode;
    file?: File;
    accept: string;
    hint: string;
    error?: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    onChange: (file?: File) => void;
    onRemove: () => void;
    label: string;
}

const FileUploadDropzone = ({
    id,
    icon,
    file,
    accept,
    hint,
    error,
    inputRef,
    onChange,
    onRemove,
    label,
}: Props) => {
    const uploaded = file instanceof File;

    return (
        <label
            htmlFor={id}
            className={cn(
                "upload-dropzone border border-dashed",
                uploaded && "upload-dropzone-uploaded",
                error
                    ? "border-red-500 bg-red-50 ring-1 ring-red-500"
                    : "border-[var(--border-subtle)]",
            )}
        >
            {icon}

            {uploaded ? (
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <span className="upload-dropzone-text">
                            {file.name}
                        </span>

                        <button
                            type="button"
                            className="upload-dropzone-remove"
                            onClick={(e) => {
                                e.preventDefault();
                                onRemove();
                            }}
                        >
                            <X />
                        </button>
                    </div>

                    <span className="upload-dropzone-hint">{hint}</span>
                </div>
            ) : (
                <>
                    <span className="upload-dropzone-text">{label}</span>

                    <span className="upload-dropzone-hint">{hint}</span>
                </>
            )}

            <input
                id={id}
                ref={inputRef}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(e) => onChange(e.target.files?.[0])}
            />
        </label>
    );
};

export default FileUploadDropzone;
