import Header from "@/components/Header";

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
