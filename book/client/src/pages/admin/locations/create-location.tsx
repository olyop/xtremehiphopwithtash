import { useApolloClient, useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import FormError from "../../../components/form-error";
import LocationForm from "../../../components/forms/location-form";
import Modal from "../../../components/modal";
import {
	Coordinates,
	CreateLocationMutation,
	LocationInput,
	MutationCreateLocationArgs,
	QuerySearchPlaceByNameArgs,
	SearchPlaceByNameQuery,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_LOCATION from "./create-location.graphql";
import GET_LOCATIONS from "./get-locations.graphql";
import { initialInput } from "./initial-input";
import SEARCH_PLACE_BY_NAME from "./search-place-by-name.graphql";

const AddLocation: FC = () => {
	const apollo = useApolloClient();

	const [input, setInput] = useState<LocationInput>(initialInput);
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

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

	const handlePlusCodeChange = (plusCode: string) => {
		setInput(prevState => ({
			...prevState,
			plusCode,
		}));
	};

	const handleAddressChange = (address: string) => {
		setInput(prevState => ({
			...prevState,
			address,
		}));
	};

	const guessPlaceFromName = async (name: string) => {
		const result = await apollo.query<SearchPlaceByNameQuery, QuerySearchPlaceByNameArgs>({
			query: SEARCH_PLACE_BY_NAME,
			variables: {
				name,
			},
		});

		if (result.data.searchPlaceByName) {
			setCoordinates(result.data.searchPlaceByName.coordinates);
			handleAddressChange(result.data.searchPlaceByName.address);
			handlePlusCodeChange(result.data.searchPlaceByName.plusCode);
		}
	};

	const [isOpen, openModal, closeModal] = useModal(handleFormReset);

	useEffect(() => {
		if (data) {
			closeModal();
		}
	}, [data]);

	useEffect(() => {
		if (input.name.length === 0) {
			handleAddressChange("");
			handlePlusCodeChange("");
		} else {
			void guessPlaceFromName(input.name);
		}
	}, [input.name]);

	return (
		<Fragment>
			<Button
				text="Add Location"
				ariaLabel="Click to add a Location"
				onClick={openModal}
				leftIcon={className => <PlusIcon className={className} />}
			/>
			<Modal
				isLarge
				title="Add Location"
				icon={className => <PlusIcon className={className} />}
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				children={
					<Fragment>
						<LocationForm input={input} onChange={setInput} coordinates={coordinates} />
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

type Data = CreateLocationMutation;
type Vars = MutationCreateLocationArgs;

export default AddLocation;
