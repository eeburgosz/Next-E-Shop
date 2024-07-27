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
}

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();
