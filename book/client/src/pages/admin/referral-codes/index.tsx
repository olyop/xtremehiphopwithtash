import { useMutation } from "@apollo/client";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement } from "react";

import Button from "../../../components/button";
import CopyButton from "../../../components/copy-button";
import Modal from "../../../components/modal";
import { GenerateReferalCodeMutation } from "../../../generated-types";
import { useModal } from "../../../hooks";
import GENERATE_REFERRAL_CODE from "./generate-referral-code.graphql";

/**
 * REFRERAL CODES:
 * 	FULL PRICE OFF
 *  50% OFF
 */

const ReferralCodes: FC = () => {
	const [isModalOpen, openModal, closeModal] = useModal();

	const [generate, { data }] = useMutation<Data>(GENERATE_REFERRAL_CODE);

	const handleGenerate = () => {
		void generate();
	};

	return (
		<div className="flex flex-col items-start gap-2">
			<h2 className="text-2xl">Referral Codes</h2>
			<Button
				onClick={openModal}
				text="Generate Referral Code"
				ariaLabel="Generate Referral Code"
				leftIcon={className => <ArrowPathIcon className={className} />}
			/>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				title="Generate Referral Code"
				icon={className => <ArrowPathIcon className={className} />}
				contentClassName="flex flex-col gap-2"
				children={
					<Fragment>
						<p>Generates a one-time code that will waive the payment.</p>
						{data && data.generateReferralCode && (
							<div className="flex gap-2 items-center">
								<p className="text-green-500">Code: {data.generateReferralCode}</p>
								<CopyButton ariaLabel="Copy referral code" text={data.generateReferralCode} />
							</div>
						)}
					</Fragment>
				}
				buttons={
					<Fragment>
						<Button
							text={data ? "Regenerate" : "Generate"}
							ariaLabel="Generate Referral Code"
							onClick={handleGenerate}
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

type Data = GenerateReferalCodeMutation;

export default ReferralCodes;
