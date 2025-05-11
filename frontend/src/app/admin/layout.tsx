import HeaderAdmin from "@/components/admin/HeaderAdmin";
import SidebarAdmin from "@/components/admin/SidebarAdmin";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f7f7fa] dark:bg-[#10121a]">
            <HeaderAdmin />
            <div className="flex justify-center">
                <div className="flex w-full max-w-[1440px]">
                    <SidebarAdmin />
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
