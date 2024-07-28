"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
	page?: number;
	take?: number;
}

export const getPaginatedProductsWithImages = async ({
	page = 1,
	take = 12,
}: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		const products = await prisma.product.findMany({
			take: take,
			skip: (page - 1) * take,
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
