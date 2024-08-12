"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		setLoaded(true);
	}, []);
	const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation()
	);

	if (!loaded) return <p>Cargando...</p>;

	return (
		<div className="grid grid-cols-2">
			{loaded && (
				<>
					<span>No. de productos</span>
					<span className="text-right">
						{itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
					</span>

					<span>Subtotal</span>
					<span className="text-right">${subTotal}</span>

					<span>Impuestos (15%)</span>
					<span className="text-right">${tax}</span>

					<span className="text-2xl mt-5">Total:</span>
					<span className="text-right text-2xl mt-5">${total}</span>
				</>
			)}
		</div>
	);
};
