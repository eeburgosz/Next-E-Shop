import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
	//! 1. Primero borramos lo que está en la DB.
	await Promise.all([
		prisma.productImage.deleteMany(),
		prisma.product.deleteMany(),
		prisma.category.deleteMany(),
	]);

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

	console.log(categoriesMap);
}

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();
