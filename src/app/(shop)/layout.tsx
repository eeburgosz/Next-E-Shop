import { TopMenu } from "@/components";

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<TopMenu />
			<main className="">{children}</main>
		</div>
	);
}
