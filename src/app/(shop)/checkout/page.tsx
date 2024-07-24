import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default function CheckoutPage() {
	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px] ">
				<Title title="Verificar orden" />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Ajustar productos</span>
						<Link href={"/cart"} className="underline mb-5">
							Editar carrito
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
									<p>
										${product.price.toFixed(2)} x {3} Un.
									</p>
									<p className="font-bold">Subtotal: ${product.price * 3}</p>
								</div>
							</div>
						))}
					</div>
					{/* Checkout - Resumen de orden */}
					<div className="bg-white rounded-xl shadow-xl p-7">
						<h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
						<div className="mb-10">
							<p className="text-xl">Ernesto Burgos</p>
							<p>Av. Siempre Viva 743</p>
							<p>Springfield</p>
							<p>Código postal 1428</p>
							<p>Teléfono: +54 9 11 22334455</p>
						</div>

						{/* Divider */}
						<div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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
							{/* Disclaimer */}
							<p className="mb-5">
								<span className="text-xs">
									Al hacer clic en &quot;Colocar orden&quot;, acepta nuestros{" "}
									<a href="#" className="underline">
										términos y condiciones
									</a>{" "}
									de uso y{" "}
									<a href="#" className="underline">
										políticas de privacidad.
									</a>
								</span>
							</p>
							<Link
								href={"/orders/123"}
								className="flex btn-primary justify-center"
							>
								Colocar orden
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
