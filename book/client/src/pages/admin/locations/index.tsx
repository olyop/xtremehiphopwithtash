import { useMutation, useQuery } from "@apollo/client";
import { FC, createElement } from "react";

import {
	DeleteLocationMutation,
	GetLocationsQuery,
	LocationInput,
	Location as LocationType,
	MutationDeleteLocationByIdArgs,
	MutationUpdateLocationByIdArgs,
	UpdateLocationMutation,
} from "../../../generated-types";
import { ArrayElement } from "../../../utils";
import { OnEditAndUpdate } from "../entity";
import Section from "../section";
import CreateInstructor from "./create-location";
import DELETE_LOCATION from "./delete-location.graphql";
import GET_LOCATIONS from "./get-locations.graphql";
import Location from "./location";
import UPDATE_LOCATION from "./update-location.graphql";

const Locations: FC = () => {
	const { data } = useQuery<GetLocationsQuery>(GET_LOCATIONS);

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
						address: input.address,
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
		<Section<ArrayElement<GetLocationsQuery["getLocations"]>>
			title="Locations"
			items={data?.getLocations}
			create={<CreateInstructor />}
			renderItem={location => (
				<Location
					key={location.locationID}
					location={location as LocationType}
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

type UpdateData = UpdateLocationMutation;
type DeleteData = DeleteLocationMutation;
type UpdateVars = MutationUpdateLocationByIdArgs;
type DeleteVars = MutationDeleteLocationByIdArgs;

export default Locations;
