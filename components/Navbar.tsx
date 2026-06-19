"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SignInButton,
    SignUpButton,
    Show,
    UserButton,
    useUser,
} from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
];

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();

    return (
        <header className="w-full fixed z-50 bg-(--bg-primary)">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="Nerdified"
                        width={42}
                        height={26}
                    />
                    <span className="logo-text">Nerdified</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ label, href }) => {
                        const isActive =
                            pathName === href ||
                            (href !== "/" && pathName.startsWith(href));

                        return (
                            <Link
                                key={label}
                                href={href}
                                className={cn(
                                    "nav-link-base",
                                    isActive
                                        ? "nav-link-active"
                                        : "text-black hover:opacity-70",
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    <Show when="signed-out">
                        <div className="flex gap-3 items-center">
                            <SignInButton>
                                <button className="rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-50">
                                    Sign in
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                                    Sign up
                                </button>
                            </SignUpButton>
                        </div>
                    </Show>

                    <Show when="signed-in">
                        <UserButton />
                        {user?.firstName && (
                            <Link href="/" className="nav-user-name">
                                {user.firstName}
                            </Link>
                        )}
                    </Show>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
