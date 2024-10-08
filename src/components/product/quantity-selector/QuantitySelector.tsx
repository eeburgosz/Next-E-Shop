"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
	quantity: number;
	onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
	const onValueChanged = (value: number) => {
		if (quantity + value < 1) return;
		if (quantity + value > 10) return;
		onQuantityChanged(quantity + value);
	};

	return (
		<div className="flex">
			<button onClick={() => onValueChanged(-1)}>
				<IoRemoveCircleOutline size={30} />
			</button>
			<span className="flex items-center justify-center w-20 mx-3 px-5 bg-gray-200 text-center rounded ">
				{quantity}
			</span>
			<button onClick={() => onValueChanged(1)}>
				<IoAddCircleOutline size={30} />
			</button>
		</div>
	);
};
