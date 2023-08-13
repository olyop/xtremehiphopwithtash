import { FC, Fragment, createElement, useEffect, useState } from "react";
import { useModal } from "../../hooks";
import { BookingInput, Session } from "../../generated-types";
import Modal from "../../components/modal";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import ArrowSmallRightIcon from "@heroicons/react/24/solid/ArrowSmallRightIcon";
import Button from "../../components/button";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import Input, { InputType } from "../../components/input";
import { InputOnChange, SelectOption } from "../../components/input/types";
import { currencyDollarsFormatter } from "../../helpers/intl";
import { centsToDollars } from "../../utils";

const EquipmentHireWarning: FC<PropTypes> = ({ session, bookingInput, onUpdateEquipmentHire }) => {
	const [showEquipmentHireInput, setShowEquipmentHireInput] = useState(false);
	const [equipmentQuantity, setEquipmentQuantity] = useState(bookingInput.equipmentQuantity);
	const [isEquipmentHireWarningOpen, openEquipmentHireWarning, closeEquipmentHireWarning] = useModal();

	const handleShowEquipmentHireInput = () => {
		setShowEquipmentHireInput(true);
	};

	const handleEquipmentQuantityChange: InputOnChange = inputValue => {
		if (typeof inputValue === "string") {
			const value = Number.parseInt(inputValue);
			setEquipmentQuantity(value === 0 ? null : value);
		}
	};

	const handleSubmitEquipmentHired = () => {
		onUpdateEquipmentHire(equipmentQuantity);
		closeEquipmentHireWarning();
	};

	useEffect(() => {
		if (bookingInput.equipmentQuantity === null) {
			openEquipmentHireWarning();
		}
	}, []);

	const bookingEquipmentSelectOptions: SelectOption[] = Array.from({
		length: session.equipmentRemaining ? bookingInput.bookingQuantity : 0,
	})
		.map((_, index) => ({
			description: `Hire ${index + 1} step${index + 1 > 1 ? "s" : ""}`,
			optionID: `${index + 1}`,
		}))
		.slice(0, session.equipmentRemaining ?? 0);

	return (
		<Modal
			isOpen={isEquipmentHireWarningOpen}
			onClose={closeEquipmentHireWarning}
			title="Step Hire"
			modalClassName="!top-1/2 !-translate-y-1/2"
			icon={className => <ExclamationCircleIcon className={className} />}
			children={
				<Fragment>
					{showEquipmentHireInput ? (
						<div className="flex gap-4 flex-col">
							<Input
								id="equipmentQuantity"
								name="Step Hire"
								placeHolder={session.equipmentRemaining ? "None" : "None avaliable"}
								disabled={!session.equipmentRemaining}
								value={String(equipmentQuantity)}
								onChange={handleEquipmentQuantityChange}
								selectOptions={bookingEquipmentSelectOptions}
								type={InputType.SELECT}
							/>
							{session.equipmentFee && (
								<p className="text-sm text-gray-500">
									Step hire will inccur a {currencyDollarsFormatter.format(centsToDollars(session.equipmentFee))} fee.
								</p>
							)}
						</div>
					) : (
						<h1 className="text-lg">Are you sure you don't need to hire a step?</h1>
					)}
				</Fragment>
			}
			buttons={
				<Fragment>
					<Button
						rightIcon={className => <ArrowSmallRightIcon className={className} />}
						ariaLabel={showEquipmentHireInput ? "Done" : "I need to hire a step"}
						text={showEquipmentHireInput ? "Done" : "I do, yes"}
						onClick={showEquipmentHireInput ? handleSubmitEquipmentHired : handleShowEquipmentHireInput}
					/>
					<Button
						transparent
						leftIcon={className => <XMarkIcon className={className} />}
						ariaLabel={showEquipmentHireInput ? "Cancel" : "I do not need to hire a step"}
						text={showEquipmentHireInput ? "Cancel" : "No"}
						onClick={closeEquipmentHireWarning}
					/>
				</Fragment>
			}
		/>
	);
};

interface PropTypes {
	session: Session;
	bookingInput: BookingInput;
	onUpdateEquipmentHire: (equipmentQuantity: number | null) => void;
}

export default EquipmentHireWarning;
