export const revalidate = 604800; // Actualiza en 7 días aprox.

import { getProductBySlug } from "@/actions";
import {
	ProductMobileSlideshow,
	ProductSlideshow,
	QuantitySelector,
	SizeSelector,
	StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
// import { revalidate } from "../../gender/[gender]/page";

interface Props {
	params: {
		slug: string;
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = params;
	// const product = initialData.products.find((product) => product.slug === slug);
	const product = await getProductBySlug(slug);
	console.log(product);
	if (!product) notFound();

	return (
		<div className="mt-5 mb-20 grid grid-cols-1 sm:grid-cols-3 gap-3">
			{/* Mobile Slideshow */}
			<div className="col-span-1 sm:col-span-2">
				<ProductMobileSlideshow
					className="block md:hidden"
					title={product.title}
					images={product.images}
				/>
			</div>
			{/* Desktop Slideshow */}
			<div className="col-span-1 sm:col-span-2">
				<ProductSlideshow
					className="hidden md:block"
					title={product.title}
					images={product.images}
				/>
			</div>

			{/* Detalles */}
			<div className="col-span-1 px-5">
				<StockLabel slug={product.slug} />
				<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
					{product.title}
				</h1>
				<p className="text-lg mb-5">${product.price.toFixed(2)}</p>
				{/* Selector de tallas */}
				<SizeSelector
					selectedSize={product.sizes[0]}
					availableSizes={product.sizes}
				/>
				{/* Selector de cantidad */}
				<QuantitySelector quantity={2} />
				{/* Botón */}
				<button className="btn-primary my-5">Agregar al carrito</button>
				{/* Descripción */}
				<h3 className="font-bold text-sm">Descripción</h3>
				<p className="font-light">{product.description}</p>
			</div>
		</div>
	);
}
