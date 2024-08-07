"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
	try {
		const product = await prisma.product.findFirst({
			include: {
				ProductImage: {
					select: {
						url: true,
					},
				},
			},
			where: {
				slug: slug,
			},
		});

		if (!product) return null;
		return {
			...product,
			description: product.description || "", //! Esto lo tuve qué hacer porque me daba un warning en /gender/[gender]
			images: product.ProductImage.map((image) => image.url),
		};
	} catch (error) {
		console.log(error);
		throw new Error("Error al obtener producto por slug - getProductBySlug");
	}
};
