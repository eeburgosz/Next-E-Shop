"use server";

import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async () => {
	try {
		const products = await prisma.product.findMany({
			include: {
				ProductImage: {
					take: 2,
					select: {
						url: true,
					},
				},
			},
		});
		// console.log(products);
		//! Lo regreso de la siguiente forma para que quede igual a mi interface Product.
		//! Tambien lo regreso así porque más adelante le pondré otras propiedades como currentPage, totalPages...
		return {
			products: products.map((product) => ({
				...product,
				images: product.ProductImage.map((image) => image.url),
			})),
		};
	} catch (error) {
		throw new Error(
			"No se pudieron cargar los productos - getPaginatedProductsWithImages"
		);
	}
};
