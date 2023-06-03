import { MutationResult } from "@apollo/client";
import { FC, createElement, useState } from "react";

import LocationInput from "../../../components/forms/location-form";
import {
	LocationInput as LocationInputType,
	Location as LocationType,
} from "../../../generated-types";
import AdminEntity, { OnEditAndUpdate } from "../entity";
import { mapLocationToInput } from "../map-entity-to-input";

const Location: FC<PropTypes> = ({
	location,
	onUpdate,
	onDelete,
	isUpdating,
	isDeleting,
	updateModalError,
	deleteModalError,
}) => {
	const [input, setInput] = useState<LocationInputType>(mapLocationToInput(location));
	return (
		<AdminEntity
			id={location.locationID}
			text={location.name}
			description={location.address}
			typeName={location.__typename}
			isLargeEditModal
			editModalContent={
				<LocationInput input={input} onChange={setInput} coordinates={location.coordinates} />
			}
			onEdit={onUpdate(input)}
			onDelete={onDelete}
			isUpdating={isUpdating}
			isDeleting={isDeleting}
			editModalError={updateModalError}
			deleteModalError={deleteModalError}
		/>
	);
};

interface PropTypes {
	location: LocationType;
	onUpdate: (input: LocationInputType) => OnEditAndUpdate;
	onDelete: OnEditAndUpdate;
	isUpdating: boolean;
	isDeleting: boolean;
	updateModalError: MutationResult["error"];
	deleteModalError: MutationResult["error"];
}

export default Location;
