import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
	// console.log(initialData);
	//! Primero borramos lo que está en la DB.
	await Promise.all([
		prisma.productImage.deleteMany(),
		prisma.product.deleteMany(),
		prisma.category.deleteMany(),
	]);
	console.log("Seed ejecutado correctamente");
}

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();
