import { ProductsGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
	params: {
		id: Category;
	};
}

export default function CategorytPage({ params }: Props) {
	const { id } = params;

	// if (id === "kids") notFound();

	const products = seedProducts.filter((product) => product.gender === id);

	const labels: Record<Category, string> = {
		men: "para hombres",
		women: "para mujeres",
		kid: "para niños",
		unisex: "para todos",
	};

	return (
		<>
			<Title
				title={`Artículos ${labels[id]}`}
				subtitle={`Todos los productos`}
				className="mb-2"
			/>
			<ProductsGrid products={products} />
		</>
	);
}
