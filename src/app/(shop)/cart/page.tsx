import { Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";

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
						<ProductsInCart />
					</div>
					{/* Checkout - Resumen de orden */}
					<div className="bg-white rounded-xl shadow-xl p-7 h-fit">
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
