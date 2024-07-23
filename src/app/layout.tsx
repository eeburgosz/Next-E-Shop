import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { inter } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
	title: "E-Shop",
	description: "Lorem cupidatat commodo reprehenderit est est reprehenderit.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
