export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<main className="bg-red-500 min-h-screen">{children}</main>
		</div>
	);
}
