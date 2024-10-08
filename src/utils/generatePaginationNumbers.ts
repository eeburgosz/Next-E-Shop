// [1,2,3,4,5,...,10]
export const generatePaginationNumbers = (
	currentPage: number,
	totalPages: number
) => {
	// Si el número total de páginas es 7 o menos, mostramos todas las páginas sin ...
	if (totalPages <= 7)
		return Array.from({ length: totalPages }, (_, i) => i + 1);

	// Si la página actual está entre las primeras 3 páginas
	// Mostrar las primeras 3, puntos suspensivos, las últimas 2
	if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages];

	// Si la página actual está entre las últimas 3 páginas
	// Mostrar las primeras 2, puntos suspensivos, las últimas 3
	if (currentPage >= totalPages - 2)
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

	// Si la página actual está en otro lugar medio
	// Mostrar la primera página, puntos suspensivos, página actual y vecinos
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
