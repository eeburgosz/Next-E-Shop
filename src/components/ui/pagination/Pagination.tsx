"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
	totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) ?? 1;

	//! Esta función sale de la documnetación del tutorial de Next.js V14
	const createPageUrl = (pageNumber: number | string) => {
		//* Puedo recibir un string por si tengo muchas páginas y quiero un botón con ...
		const params = new URLSearchParams(searchParams); //* URLSearchParams ya viene en JS y nos va a servir para construir los parámetros del URL
		if (pageNumber === "...") return `${pathName}?${params.toString()}`;
		if (+pageNumber <= 0) return `${pathName}`;
		if (+pageNumber > totalPages) return `${pathName}?${params.toString()}`; // Para el Next
		params.set("page", pageNumber.toString());
		return `${pathName}?${params.toString()}`;
	};

	return (
		<div className="flex justify-center text-center mt-10 mb-32">
			<nav aria-label="Page navigation example">
				<ul className="flex list-style-none">
					<li className="page-item">
						<Link
							className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href={createPageUrl(currentPage - 1)}
						>
							<IoChevronBackOutline size={30} />
						</Link>
					</li>

					<li className="page-item">
						<Link
							className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href="#"
						>
							1
						</Link>
					</li>

					<li className="page-item active">
						<Link
							className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
							href="#"
						>
							2 <span className="visually-hidden"></span>
						</Link>
					</li>

					<li className="page-item">
						<Link
							className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href="#"
						>
							3
						</Link>
					</li>

					<li className="page-item">
						<Link
							className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href={createPageUrl(currentPage + 1)}
						>
							<IoChevronForwardOutline size={30} />
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
