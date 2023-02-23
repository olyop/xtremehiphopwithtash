import { MutationResult } from "@apollo/client";
import { FC, createElement, useState } from "react";

import Entity, { OnEditAndUpdate } from "../../../components/entity";
import {
	LocationInput as LocationInputType,
	Location as LocationType,
} from "../../../generated-types";
import LocationInput from "./location-input";

const Location: FC<PropTypes> = ({
	location,
	onUpdate,
	onDelete,
	isUpdating,
	isDeleting,
	updateModalError,
	deleteModalError,
}) => {
	const [input, setInput] = useState<LocationInputType>(location);
	return (
		<Entity
			id={location.locationID}
			text={location.name}
			description={location.plusCode}
			typeName={location.__typename}
			editModalContent={<LocationInput input={input} onChange={setInput} />}
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
