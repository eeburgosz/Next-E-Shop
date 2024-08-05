"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
	page?: number;
	take?: number;
	gender?: Gender; //! Opcional... Si no lo mandan, muestra la página principal
}

export const getPaginatedProductsWithImages = async ({
	page = 1,
	take = 12,
	gender,
}: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		//* 1. Obtener los productos

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
			//! Por género
			where: { gender: gender },
		});
		// console.log(products);

		//* 2. Obtener el total de páginas
		// todo:
		const totalCount = await prisma.product.count({
			where: { gender: gender },
		});
		const totalPages = Math.ceil(totalCount / take);

		//! Lo regreso de la siguiente forma para que quede igual a mi interface Product.
		//! Tambien lo regreso así porque más adelante le pondré otras propiedades como currentPage, totalPages...
		return {
			currentPage: page,
			totalPages: totalPages,
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
