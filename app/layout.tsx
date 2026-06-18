import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    variable: "--font-ibm-plex-serif",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const monaSans = Mona_Sans({
    subsets: ["latin"],
    variable: "--font-mona-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Nerdified App",
    description:
        "Transform your code into a beautifully formatted image with Nerdified App. Upload your PDF and chat with your code like never before. Powered by Next.js, TypeScript, Tailwind CSS, and OpenAI's GPT-4.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
