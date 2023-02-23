import { useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import FormError from "../../../components/form-error";
import Modal from "../../../components/modal";
import {
	LocationInput as LocationInputType,
	Mutation,
	MutationCreateLocationArgs,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_LOCATION from "./create-location.graphql";
import GET_LOCATIONS from "./get-locations.graphql";
import { initialInput } from "./initial-input";
import LocationInput from "./location-input";

const AddLocation: FC = () => {
	const [input, setInput] = useState<LocationInputType>(initialInput);

	const [createLocation, { data, loading, error }] = useMutation<Data, Vars>(CREATE_LOCATION);

	const handleSubmit = () => {
		if (!data) {
			void createLocation({
				refetchQueries: [GET_LOCATIONS],
				variables: {
					input,
				},
			});
		}
	};

	const handleFormReset = () => {
		setInput(initialInput);
	};

	const [isOpen, openModal, closeModal] = useModal(handleFormReset);

	useEffect(() => {
		if (data) {
			closeModal();
		}
	}, [data]);

	return (
		<Fragment>
			<Button
				text="Add Location"
				ariaLabel="Click to add a Location"
				onClick={openModal}
				leftIcon={className => <PlusIcon className={className} />}
			/>
			<Modal
				title="Add Location"
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				children={
					<Fragment>
						<LocationInput input={input} onChange={setInput} />
						<FormError error={error} />
					</Fragment>
				}
				buttons={
					<Fragment>
						<Button
							onClick={handleSubmit}
							className="self-start"
							leftIcon={className => <PlusIcon className={className} />}
							text={loading ? "Adding Location..." : "Add Location"}
							ariaLabel={loading ? "Adding Location now" : "Click to add Location"}
						/>
						<Button
							transparent
							text="Close"
							ariaLabel="Close Add Location"
							onClick={closeModal}
							disabled={loading}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

type Data = Pick<Mutation, "createLocation">;
type Vars = MutationCreateLocationArgs;

export default AddLocation;
