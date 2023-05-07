import { useApolloClient, useMutation } from "@apollo/client";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import Button from "../../../components/button";
import LocationForm from "../../../components/forms/location-form";
import Modal from "../../../components/modal";
import {
	Coordinates,
	CreateLocationMutation,
	DecodePlusCodeQuery,
	LocationInput,
	MutationCreateLocationArgs,
	QueryDecodePlusCodeArgs,
	QuerySearchPlaceByNameArgs,
	SearchPlaceByNameQuery,
} from "../../../generated-types";
import { useModal } from "../../../hooks";
import CREATE_LOCATION from "./create-location.graphql";
import DECODE_PLUS_CODE from "./decode-plus-code.graphql";
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

	const decodePlusCode = async (plusCode: string) => {
		const result = await apollo.query<DecodePlusCodeQuery, QueryDecodePlusCodeArgs>({
			query: DECODE_PLUS_CODE,
			variables: {
				plusCode,
			},
		});

		if (result.data.decodePlusCode) {
			setCoordinates(result.data.decodePlusCode);
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

	useEffect(() => {
		if (input.plusCode.length === 0) {
			setCoordinates(null);
		} else {
			void decodePlusCode(input.plusCode);
		}
	}, [input.plusCode]);

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
				isOpen={isOpen}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				icon={className => <PlusIcon className={className} />}
				children={<LocationForm input={input} onChange={setInput} coordinates={coordinates} />}
				error={error}
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
