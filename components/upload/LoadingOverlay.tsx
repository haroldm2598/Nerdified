interface Props {
    open: boolean;
}

const LoadingOverlay = ({ open }: Props) => {
    if (!open) return null;

    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper">
                <div className="loading-shadow">
                    <div className="loading-animation rounded-full w-14 h-14 border-4 border-[var(--background)] border-t-[var(--color-brand)]" />

                    <h2 className="loading-title">Preparing your book</h2>

                    <p className="text-center text-[var(--text-secondary)] max-w-sm">
                        One moment while we prepare the upload and choose the
                        perfect voice.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
