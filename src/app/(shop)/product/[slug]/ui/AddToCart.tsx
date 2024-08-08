"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { Product, Size } from "@/interfaces";

import React, { useState } from "react";

interface Props {
	product: Product;
}

export const AddToCart = ({ product }: Props) => {
	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState<number>(1);

	const addToCart = () => {
		console.log({ size, quantity });
	};

	return (
		<>
			{/* Selector de tallas */}
			<SizeSelector
				selectedSize={size}
				availableSizes={product.sizes}
				onSizeChanged={setSize}
			/>
			{/* Selector de cantidad */}
			<QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
			{/* Botón */}
			<button className="btn-primary my-5" onClick={addToCart}>
				Agregar al carrito
			</button>
		</>
	);
};
