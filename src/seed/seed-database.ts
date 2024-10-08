import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
	//! 1. Primero borramos lo que está en la DB.
	// await Promise.all([
	await prisma.productImage.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	// ]);

	//Categorías
	const { categories, products } = initialData;
	const categoriesData = categories.map((category) => ({
		name: category,
	}));

	await prisma.category.createMany({
		data: categoriesData,
	});

	const categoriesDB = await prisma.category.findMany({});
	const categoriesMap = categoriesDB.reduce((map, category) => {
		map[category.name.toLowerCase()] = category.id;
		return map;
	}, {} as Record<string, string>); // <string = shirt, string = uuid de shirt>

	//Productos
	// const { images, type, ...product1 } = products[0];
	// await prisma.product.create({
	// 	data: {
	// 		...product1,
	// 		categoryId: categoriesMap["shirts"],
	// 	},
	// });
	products.forEach(async (product) => {
		const { images, type, ...rest } = product;
		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesMap[type],
			},
		});
		// Imágenes
		const imagesData = images.map((image) => ({
			url: image,
			productId: dbProduct.id,
		}));
		await prisma.productImage.createMany({
			data: imagesData,
		});
	});

	console.log("Seed creado correctamente");
}

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();
