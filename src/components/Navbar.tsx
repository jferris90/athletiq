"use client"

import { useState, useEffect } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
    const {isSignedIn} = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = () => setMenuOpen(false);

    // Close mobile menu on scroll
    useEffect(() => {
        if (!menuOpen) return;
        const handleScroll = () => setMenuOpen(false);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b py-3">
            <div className="container mx-auto flex items-center justify-between">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-1 bg-primary/10 rounded">
                        <ZapIcon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xl font-bold font-mono">
                        Athlet<span className="text-primary">iQ</span>.ai
                    </span>
                </Link>

                {/* MOBILE MENU */}
                <button
                    className="sm:hidden flex items-center justify-center p-2 rounded-md focus:outline-none"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                </button>

                {/* NAVIGATION (DESKTOP) */}
                <nav className="hidden lg:flex md:flex min-sm:flex items-center gap-5">
                    {isSignedIn ? (
                        <>
                            <Link href="/" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                                <HomeIcon size={16} />
                                <span>Home</span>
                            </Link>

                            <Link href="/generate-program" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                                <DumbbellIcon size={16} />
                                <span>Generate</span>
                            </Link>

                            <Link href="/profile" className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                                <UserIcon size={16} />
                                <span>Profile</span>
                            </Link>

                            <Button asChild variant="outline" className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10">
                                <Link href="/generate-program">Get Started</Link>
                            </Button>

                            <UserButton />

                        </>
                    ) : (
                        <>
                            <SignInButton>
                                <Button variant={"outline"} className="border-primary/50 text-primary hover:text-white hover:bg-primary/10">Sign In</Button>
                            </SignInButton>

                            <SignUpButton>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
                            </SignUpButton>
                        </>
                    )}
                </nav>

                {/* NAVIGATION (MOBILE) */}
                {menuOpen && (
                    <nav className="fixed top-40 left-0 w-full h-full bg-background/50 z-50 flex flex-col items-center justify-center gap-4 sm:hidden animate-fadeIn">
                        
                        {isSignedIn ? (
                            <>
                                <Link href="/" className="flex items-center gap-2 text-lg font-mono hover:text-primary" onClick={handleNavClick}>
                                    <HomeIcon size={20} />
                                    <span>Home</span>
                                </Link>
                                <Link href="/generate-program" className="flex items-center gap-2 text-lg font-mono hover:text-primary" onClick={handleNavClick}>
                                    <DumbbellIcon size={20} />
                                    <span>Generate</span>
                                </Link>
                                <Link href="/profile" className="flex items-center gap-2 text-lg font-mono hover:text-primary" onClick={handleNavClick}>
                                    <UserIcon size={20} />
                                    <span>Profile</span>
                                </Link>
                                <Button asChild variant="outline" className="border-primary/50 text-primary hover:text-white hover:bg-primary/10 w-40" onClick={handleNavClick}>
                                    <Link href="/generate-program">Get Started</Link>
                                </Button>
                                <div>
                                    <UserButton />
                                </div>
                            </>
                        ) : (
                            <>
                                <SignInButton>
                                    <Button variant={"outline"} className="border-primary/50 text-primary hover:text-white hover:bg-primary/10 w-40" onClick={handleNavClick}>Sign In</Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-40" onClick={handleNavClick}>Sign Up</Button>
                                </SignUpButton>
                            </>
                        )}
                    </nav>
                )}
            </div>

            {/* Responsive styles */}
            <style jsx global>{`
                @media (max-width: 620px) {
                    .lg\\:flex { display: none !important; }
                    .lg\\:hidden { display: flex !important; }
                }
                @media (min-width: 621px) {
                    .lg\\:flex { display: flex !important; }
                    .lg\\:hidden { display: none !important; }
                }
            `}</style>
        </header>
    );
};

export default Navbar;