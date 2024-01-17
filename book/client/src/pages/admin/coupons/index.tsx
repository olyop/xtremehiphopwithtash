import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useState } from "react";

import Button from "../../../components/button";
import CopyButton from "../../../components/copy-button";
import Input, { InputOnChange, InputType, SelectOption } from "../../../components/input";
import Modal from "../../../components/modal";
import { GenerateCouponMutation, GenerateCouponMutationVariables } from "../../../generated-types";
import { useModal } from "../../../hooks";
import GENERATE_COUPON from "./generate-coupon.graphql";

const discountSelectOptions: SelectOption[] = Array.from({ length: 20 }).map((_, index) => ({
	description: `${5 * (index + 1)}%`,
	optionID: String(5 * (index + 1)),
}));

const AdminCoupons: FC = () => {
	const apollo = useApolloClient();

	const [loading, setLoading] = useState(false);
	const [discount, setDiscount] = useState<number>(100);
	const [isModalOpen, openModal, closeModal] = useModal();
	const [coupons, setCoupons] = useState<[string, number][] | null>(null);

	const generateCoupon = async () => {
		try {
			setLoading(true);

			const { data } = await apollo.mutate<GenerateCouponMutation, GenerateCouponMutationVariables>({
				mutation: GENERATE_COUPON,
				variables: {
					discount,
				},
			});

			if (data) {
				setCoupons(prevState => [...(prevState ?? []), [data.generateCoupon, discount]]);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleDiscountChange: InputOnChange = value => {
		if (typeof value === "string") {
			setDiscount(Number.parseInt(value, 10));
		}
	};

	const handleGenerateCoupon = () => {
		void generateCoupon();
	};

	return (
		<div className="flex flex-col items-start gap-2">
			<h2 className="text-2xl">Coupons</h2>
			<Button
				onClick={openModal}
				text="Generate"
				ariaLabel="Generate Coupon"
				leftIcon={className => <ArrowPathIcon className={className} />}
			/>
			<Modal
				isLarge
				isOpen={isModalOpen}
				onClose={closeModal}
				title="Generate Coupon"
				icon={className => <ArrowPathIcon className={className} />}
				contentClassName="flex flex-col gap-2"
				children={
					<Fragment>
						<p className="text-sm mb-2">Generates a one-time code that will discount the booking fee.</p>
						<Input
							id="discount"
							name="Discount"
							type={InputType.SELECT}
							selectOptions={discountSelectOptions}
							note="Discount in percentage"
							value={String(discount)}
							onChange={handleDiscountChange}
						/>
						{coupons && (
							<Fragment>
								<div className="flex flex-col p-1 border">
									{coupons.map((code, index) => (
										<div key={code[0]} className="flex gap-2 items-center">
											<p className="text-green-500 text-xl font-mono">
												{index + 1}. {code[0]} ({code[1]}%)
											</p>
											<CopyButton ariaLabel="Copy referral code" text={code[0]} />
										</div>
									))}
								</div>
								{coupons.length > 1 && (
									<CopyButton
										buttonText="Copy All"
										ariaLabel="Copy all referral codes"
										text={coupons.map(code => code[0]).join(", ")}
									/>
								)}
							</Fragment>
						)}
					</Fragment>
				}
				buttons={
					<Fragment>
						<Button
							text={coupons && coupons.length > 0 ? "Regenerate" : "Generate"}
							ariaLabel="Generate Coupon Code"
							disabled={loading}
							onClick={handleGenerateCoupon}
							leftIcon={className => <ArrowPathIcon className={className} />}
						/>
						<Button
							transparent
							text="Cancel"
							ariaLabel="Cancel"
							onClick={closeModal}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</div>
	);
};

export default AdminCoupons;
