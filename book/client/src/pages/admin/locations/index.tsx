import { useMutation, useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import { OnEditAndUpdate } from "../../../components/entity";
import {
	LocationInput,
	Location as LocationType,
	Mutation,
	MutationDeleteLocationByIdArgs,
	MutationUpdateLocationByIdArgs,
	Query,
} from "../../../generated-types";
import Section from "../section";
import CreateInstructor from "./create-location";
import DELETE_LOCATION from "./delete-location.graphql";
import GET_LOCATIONS from "./get-locations.graphql";
import Location from "./location";
import UPDATE_LOCATION from "./update-location.graphql";

const Locations: FC = () => {
	const { data } = useQuery<Pick<Query, "getLocations">>(GET_LOCATIONS);

	const [updateLocation, updateResult] = useMutation<UpdateData, UpdateVars>(UPDATE_LOCATION);
	const [deleteLocation, deleteResult] = useMutation<DeleteData, DeleteVars>(DELETE_LOCATION);

	const handleUpdateLocation =
		({ locationID }: Pick<LocationType, "locationID">) =>
		(input: LocationInput): OnEditAndUpdate =>
		async onClose => {
			const result = await updateLocation({
				refetchQueries: [GET_LOCATIONS],
				variables: {
					locationID,
					input: {
						name: input.name,
						plusCode: input.plusCode,
					},
				},
			});

			if (result.data?.updateLocationByID) {
				onClose();
			}
		};

	const handleDeleteLocation =
		({ locationID }: Pick<LocationType, "locationID">): OnEditAndUpdate =>
		async onClose => {
			const result = await deleteLocation({
				variables: { locationID },
				refetchQueries: [GET_LOCATIONS],
			});

			if (result.data?.deleteLocationByID) {
				onClose();
			}
		};

	return (
		<Section<LocationType>
			title="Locations"
			items={data?.getLocations}
			create={<CreateInstructor />}
			renderItem={location => (
				<Location
					key={location.locationID}
					location={location}
					onUpdate={handleUpdateLocation(location)}
					onDelete={handleDeleteLocation(location)}
					isUpdating={updateResult.loading}
					isDeleting={deleteResult.loading}
					updateModalError={updateResult.error}
					deleteModalError={deleteResult.error}
				/>
			)}
		/>
	);
};

type UpdateData = Pick<Mutation, "updateLocationByID">;
type DeleteData = Pick<Mutation, "deleteLocationByID">;
type UpdateVars = MutationUpdateLocationByIdArgs;
type DeleteVars = MutationDeleteLocationByIdArgs;

export default Locations;
