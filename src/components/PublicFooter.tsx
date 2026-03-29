import Link from "next/link";

export default function PublicFooter() {
    return (
        <footer className="bg-white border-t border-[#E9E5F5] py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-white font-black shadow-md">
                                A
                            </div>
                            <span className="text-lg font-black tracking-tight text-[#1A1A1A]">
                                Aether
                            </span>
                        </Link>
                        <p className="text-[#6B6585] text-sm max-w-sm leading-relaxed font-medium">
                            Enterprise-grade medical software designed to streamline clinic operations, empower doctors, and improve patient outcomes.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-4">Product</h4>
                        <div className="flex flex-col gap-3 text-sm font-medium text-[#6B6585]">
                            <Link href="/features" className="hover:text-[#1A1A1A] transition-colors">Features</Link>
                            <Link href="/how-it-works" className="hover:text-[#1A1A1A] transition-colors">How it Works</Link>
                            <Link href="/pricing" className="hover:text-[#1A1A1A] transition-colors">Pricing</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-4">Company</h4>
                        <div className="flex flex-col gap-3 text-sm font-medium text-[#6B6585]">
                            <a href="#" className="hover:text-[#1A1A1A] transition-colors">About Us</a>
                            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Careers</a>
                            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#E9E5F5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#8B85A5]">
                    <p>&copy; {new Date().getFullYear()} Aether Technologies, Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

