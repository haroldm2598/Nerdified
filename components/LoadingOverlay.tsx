import { UploadCloud } from "lucide-react";

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper" role="status" aria-live="polite">
            <div className="loading-shadow-wrapper shadow-soft-lg bg-white">
                <div className="loading-shadow">
                    <div className="loading-animation">
                        <UploadCloud className="w-14 h-14 text-[#663820]" />
                    </div>
                    <div className="loading-title">Beginning synthesis</div>
                    <div className="loading-progress">
                        <div className="loading-progress-item">
                            <span className="loading-progress-status" />
                            <span>Uploading PDF and cover art</span>
                        </div>
                        <div className="loading-progress-item">
                            <span className="loading-progress-status" />
                            <span>Preparing the literary voice</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
