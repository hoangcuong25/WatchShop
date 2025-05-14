'use client';

import { Sidebar } from "@/components/Sidebar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className="hidden md:block w-64 border-r bg-background">
                <Sidebar className="w-full" />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden w-full border-t bg-background">
                <div className="flex justify-around items-center h-16">
                    <Sidebar className="w-full flex-row justify-around" />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="container mx-auto p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
