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
import { Metadata, ResolvingMetadata } from "next";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
// import { revalidate } from "../../gender/[gender]/page";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const slug = params.slug;

	// fetch data
	const product = await getProductBySlug(slug);

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];

	return {
		// title: (product?.title ?? "Producto no encontrado") + " | " + "E-Shop",
		title: product?.title ?? "Producto no encontrado",
		description: product?.description ?? "",
		openGraph: {
			title: product?.title ?? "Producto no encontrado",
			description: product?.description ?? "",
			// images: [], //* https://misitioweb.com/products/image.png
			images: [`/products/${product?.images[1]}`],
		},
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = params;
	// const product = initialData.products.find((product) => product.slug === slug);
	const product = await getProductBySlug(slug);
	// console.log(product);
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

				<AddToCart product={product} />

				{/* Descripción */}
				<h3 className="font-bold text-sm">Descripción</h3>
				<p className="font-light">{product.description}</p>
			</div>
		</div>
	);
}
