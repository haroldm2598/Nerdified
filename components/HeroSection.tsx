import Image from "next/image";

const HeroSection = () => {
    return (
        <div className="library-hero-card">
            <div className="library-hero-content">
                <div className="library-hero-text">
                    <h1 className="library-hero-title">Your Library</h1>
                    <p className="library-hero-description">
                        Convert your books into interactive AI conversations.
                        Listen, learn, and discuss your favorite reads.
                    </p>
                    <button className="library-cta-primary">
                        + Add new book
                    </button>
                </div>

                <div className="library-hero-illustration-desktop">
                    <Image
                        src="/assets/hero-illustration.png"
                        alt="Vintage books and globe illustration"
                        width={420}
                        height={320}
                        className="object-contain"
                    />
                </div>

                <div className="library-steps-card space-y-6">
                    <div className="library-step-item">
                        <div className="library-step-number">1</div>
                        <div>
                            <p className="library-step-title">Upload PDF</p>
                            <p className="library-step-description">
                                Add your book file
                            </p>
                        </div>
                    </div>
                    <div className="library-step-item">
                        <div className="library-step-number">2</div>
                        <div>
                            <p className="library-step-title">AI Processing</p>
                            <p className="library-step-description">
                                We analyze the content
                            </p>
                        </div>
                    </div>
                    <div className="library-step-item">
                        <div className="library-step-number">3</div>
                        <div>
                            <p className="library-step-title">Voice Chat</p>
                            <p className="library-step-description">
                                Discuss with AI
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
