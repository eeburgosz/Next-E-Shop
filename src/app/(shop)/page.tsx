export const revalidate = 60; //! Revalida cada 60 segudnos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
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

	if (products.length === 0) redirect("/");

	// console.log({ searchParams });

	return (
		<>
			<Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
			<ProductsGrid products={products} />
			<Pagination totalPages={totalPages} />
		</>
	);
}
