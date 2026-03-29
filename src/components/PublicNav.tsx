import Link from "next/link";

export default function PublicNav() {
    return (
        <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-white/70 border-b border-[#E9E5F5]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-white font-black text-xl shadow-lg">
                        A
                    </div>
                    <span className="text-xl font-black tracking-tight text-[#1A1A1A]">
                        Aether<span className="text-[#7C3AED]">OS</span>
                    </span>
                </Link>
                
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#6B6585]">
                    <Link href="/features" className="hover:text-black transition-colors">Features</Link>
                    <Link href="/how-it-works" className="hover:text-black transition-colors">How it Works</Link>
                    <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-bold text-[#1A1A1A] hover:text-[#6B6585] transition-colors hidden sm:block">
                        Sign In
                    </Link>
                    <Link href="/login" className="px-6 py-2.5 bg-[#1A1A1A] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-md">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}

