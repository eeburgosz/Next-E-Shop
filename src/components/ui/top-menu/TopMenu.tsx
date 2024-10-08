"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCart, BiSearch } from "react-icons/bi";

export const TopMenu = () => {
	const openSideMenu = useUIStore((state) => state.openSideMenu);
	const totalItemsInCart = useCartStore((state) => state.getTotalItems()); //! La mando a ejecutar de una vez para que la variable sea ya el número

	//! Para evitar el error en la rehidratación
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<nav className="flex px-5 justify-between items-center w-full">
			{/* Logo */}
			<div>
				<Link href={"/"}>
					<span
						className={`${titleFont.className} antialiased font-bold text-3xl`}
					>
						E
					</span>
					<span className="text-3xl"> - Shop</span>
				</Link>
			</div>
			{/* Center Menu */}
			<div className="hidden sm:block">
				<Link
					href={"/gender/men"}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
				>
					Hombres
				</Link>
				<Link
					href={"/gender/women"}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
				>
					Mujeres
				</Link>
				<Link
					href={"/gender/kid"}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
				>
					Niños
				</Link>
			</div>
			{/* Search, Cart y Menu */}
			<div className="flex items-center">
				<Link href={"/search"} className="mx-2">
					<BiSearch className="w-5 h-5" />
				</Link>
				<Link
					href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
					className="mx-2"
				>
					<div className="relative">
						{loaded && totalItemsInCart > 0 && (
							<span className="fade-in  absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
								{totalItemsInCart}
							</span>
						)}
						<BiCart className="w-5 h-5" />
					</div>
				</Link>
				<button
					onClick={() => openSideMenu()}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
				>
					Menú
				</button>
			</div>
		</nav>
	);
};
