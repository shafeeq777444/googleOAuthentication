import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js app",
};

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        {/* ✅ Corrected Image Path */}
        <div className="flex justify-between items-center h-screen p-8   bg-[#FFFEFE]">
      
            <Image src="/auth.png" width={1200} height={300} priority alt="scrumX" className="rounded-[20px]   hidden xl-custom:block"  />
       
        <div className=" h-full w-full xl-custom:w-[28%]">
            <main className="h-full">{children}</main>
        </div>
        </div>
        
      </body>
    </html>
  );
}
