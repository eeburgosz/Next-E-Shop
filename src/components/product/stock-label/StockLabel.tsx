"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
	// inStock: number;
	slug: string;
}

export const StockLabel = ({ slug }: Props) => {
	const [stock, setStock] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getStock();
	}); //! Borré el array de dependencias para que no marque warning

	const getStock = async () => {
		const inStock = await getStockBySlug(slug);
		setStock(inStock);
	};

	return (
		<h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
			Stock: {stock}
			{/* Stock: {inStock} */}
		</h1>
	);
};
