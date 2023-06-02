import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Les fresques amies",
    description:
        "Les fresques amies sont des ateliers basés sur la fresque du climat : en petit groupe, grâce à l'intelligence collective et à des cartes, des participants se sensibilisent aux impacts environnementaux dans des secteurs particuliers, ou travaillent ensemble sur des solutions.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers> {children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
