import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	const { products, currentPage, totalPages } =
		await getPaginatedProductsWithImages({ page });
	console.log({ currentPage });
	console.log({ totalPages });
	if (products.length === 0) redirect("/");

	console.log({ searchParams });

	return (
		<>
			<Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
			<ProductsGrid products={products} />
		</>
	);
}
