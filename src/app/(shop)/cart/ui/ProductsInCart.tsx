"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {
	const [loaded, setLoaded] = useState(false);
	const productsInCart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Cargando...</p>;

	return (
		<>
			{productsInCart.map((product) => (
				<div key={`${product.slug}-${product.size}`} className="flex mb-5">
					<Image
						src={`/products/${product.image}`}
						alt={product.title}
						width={100}
						height={100}
						style={{
							height: "100px",
							width: "100px",
						}}
						className="mr-5 rounded"
					/>
					<div>
						<Link
							href={`/product/${product.slug}`}
							className="hover:underline cursor-pointer"
						>
							{product.size} - {product.title}
						</Link>
						<p>${product.price.toFixed(2)}</p>
						<QuantitySelector
							quantity={3}
							onQuantityChanged={(value) => console.log(value)}
						/>
						<button className="underline mt-3">Remover</button>
					</div>
				</div>
			))}
		</>
	);
};
