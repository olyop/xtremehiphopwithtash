import { useApolloClient } from "@apollo/client";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import Input, { InputOnChange, InputType } from "../../components/input";
import Modal from "../../components/modal";
import { BookingInput, VerifyCouponQuery, VerifyCouponQueryVariables } from "../../generated-types";
import { useHasMounted, useModal } from "../../hooks";
import VERIFY_COUPON from "./verify-coupon-code.graphql";

const PaymentCoupon: FC<PropTypes> = ({ bookingInput, onApplyCoupon }) => {
	const apollo = useApolloClient();
	const hasMounted = useHasMounted();
	const [isModalOpen, openModal, closeModal] = useModal();
	const [searchParams, setSearchParams] = useSearchParams();

	const couponParam = searchParams.get("coupon");

	const [code, setCode] = useState(couponParam ?? "");
	const [validationMessage, setValidationMessage] = useState<true | string | null>(null);

	const handleOpenModal = () => {
		if (bookingInput.couponCode === null) {
			openModal();
		}
	};

	const handleCodeChange: InputOnChange = value => {
		if (typeof value === "string") {
			setCode(value);
		}
	};

	const getCouponMessage = async () => {
		const { data } = await apollo.query<VerifyCouponQuery, VerifyCouponQueryVariables>({
			query: VERIFY_COUPON,
			variables: {
				code,
			},
		});

		return data.verifyCoupon;
	};

	const handleVerifyCoupon = async () => {
		if (code.length === 0) {
			setValidationMessage(null);
			setSearchParams(prevSearchParams => {
				prevSearchParams.delete("coupon");
				return prevSearchParams;
			});
		} else {
			const message = await getCouponMessage();
			setValidationMessage(message === null ? true : message);
		}
	};

	const handleApplyCoupon = () => {
		if (validationMessage === true) {
			onApplyCoupon(code);
			closeModal();
		}
	};

	useEffect(() => {
		if (hasMounted) {
			void handleVerifyCoupon();
		}
	}, [code]);

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<p className="text-2xl">Coupon</p>
				<Button
					className="self-start"
					onClick={handleOpenModal}
					disabled={bookingInput.couponCode !== null}
					text={bookingInput.couponCode ? "Coupon Applied" : "Apply Coupon"}
					ariaLabel={bookingInput.couponCode ? "Coupon Applied" : "Apply Coupon"}
					leftIcon={className =>
						bookingInput.couponCode ? (
							<CheckIcon className={className} />
						) : (
							<PlusIcon className={className} />
						)
					}
				/>
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					icon={className => <PlusIcon className={className} />}
					title="Apply Coupon"
					contentClassName="flex flex-col gap-4"
					children={
						<Fragment>
							<Input
								id="couponCode"
								name="Coupon"
								type={InputType.TEXT}
								value={code}
								onChange={handleCodeChange}
								maxLength={9}
								placeHolder="Enter Here"
								noteClassName={validationMessage === true ? "text-green-500" : "text-red-500"}
								note={validationMessage === true ? "Valid" : validationMessage}
							/>
							{bookingInput.bookingQuantity > 1 && (
								<div className="px-4 py-3 border border-yellow-500 rounded bg-yellow-50 flex gap-2">
									<InformationCircleIcon className="h-6 w-6" />
									<p>Please note coupons only apply for a single booking.</p>
								</div>
							)}
						</Fragment>
					}
					buttons={
						<Fragment>
							<Button
								text="Apply"
								onClick={handleApplyCoupon}
								leftIcon={className => <PlusIcon className={className} />}
								ariaLabel="Apply Coupon Code"
								disabled={validationMessage !== true}
							/>
							<Button
								text="Cancel"
								transparent
								ariaLabel="Cancel Coupon Code"
								leftIcon={className => <XCircleIcon className={className} />}
								onClick={closeModal}
							/>
						</Fragment>
					}
				/>
			</div>
		</Fragment>
	);
};

interface PropTypes {
	bookingInput: BookingInput;
	onApplyCoupon: (coupon: string) => void;
}

export default PaymentCoupon;
