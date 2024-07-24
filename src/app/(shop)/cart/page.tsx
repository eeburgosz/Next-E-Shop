import { QuantitySelector, Title } from "@/components";
import { Product } from "@/interfaces";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart: Product[] = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default function CartPage() {
	// productsInCart.length === 0 && redirect("/empty");

	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px] ">
				<Title title="Carrito" />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Agregar más ítems</span>
						<Link href={"/"} className="underline mb-5">
							Continúa comprando
						</Link>

						{/* Ítems */}
						{productsInCart.map((product) => (
							<div key={product.slug} className="flex mb-5">
								<Image
									src={`/products/${product.images[0]}`}
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
									<p>{product.title}</p>
									<p>${product.price.toFixed(2)}</p>
									<QuantitySelector quantity={3} />
									<button className="underline mt-3">Remover</button>
								</div>
							</div>
						))}
					</div>
					{/* Checkout - Resumen de orden */}
					<div className="bg-white rounded-xl shadow-xl p-7">
						<h2 className="text-2xl mb-2">Resumen de orden</h2>
						<div className="grid grid-cols-2">
							<span>No. de productos</span>
							<span className="text-right">{3} artículos</span>

							<span>Subtotal</span>
							<span className="text-right">$100</span>

							<span>Impuestos (15%)</span>
							<span className="text-right">$15</span>

							<span className="text-2xl mt-5">Total:</span>
							<span className="text-right text-2xl mt-5">$115</span>
						</div>
						<div className="mt-5 mb-2 w-full">
							<Link
								href={"/checkout/address"}
								className="flex btn-primary justify-center"
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
