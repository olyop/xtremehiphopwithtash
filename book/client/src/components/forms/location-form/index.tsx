import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import { Dispatch, FC, Fragment, SetStateAction, createElement } from "react";

import { Coordinates, LocationInput } from "../../../generated-types";
import { GoogleMaps } from "../../../providers/google-maps";
import { Map, Marker } from "../../google-maps";
import Input, { InputOnChange, InputType } from "../../input";

const LocationForm: FC<PropTypes> = ({ input, coordinates, onChange }) => {
	const handleChange =
		(key: keyof LocationInput): InputOnChange =>
		value => {
			onChange(prevState => ({
				...prevState,
				[key]: value,
			}));
		};

	return (
		<Fragment>
			<Input
				id="name"
				name="Name"
				value={input.name}
				type={InputType.TEXT}
				onChange={handleChange("name")}
				autoComplete="off"
				placeHolder="e.g. Gym"
			/>
			<Input
				id="plusCode"
				name="Plus Code"
				value={input.plusCode}
				type={InputType.TEXT}
				onChange={handleChange("plusCode")}
				placeHolder="e.g. 4RRG5WPV+M2"
				autoComplete="off"
				noteClassName="flex gap-1 items-start"
				note={
					<Fragment>
						<a
							target="_blank"
							rel="noreferrer"
							title="https://plus.codes/map"
							href={`https://plus.codes/${input.plusCode.length === 0 ? "map" : input.plusCode}`}
							className="hover:underline flex gap-1 items-center"
						>
							<ArrowTopRightOnSquareIcon className="h-4 w-4" />
							<span>https://plus.codes/map</span>
						</a>
					</Fragment>
				}
			/>
			<Input
				id="address"
				name="Address"
				value={input.address}
				type={InputType.TEXT}
				onChange={handleChange("address")}
				placeHolder="Address"
				autoComplete="off"
				noteClassName="flex gap-1 items-center"
				note={
					<Fragment>
						<InformationCircleIcon className="h-4 w-4" />
						<span>Guessed address from name</span>
					</Fragment>
				}
			/>
			<div className="w-full overflow-hidden bg-gray-100 rounded h-[16rem]">
				<GoogleMaps>
					{coordinates && (
						<Map
							zoom={15}
							panControl
							mapTypeControl
							fullscreenControl
							controlSize={30}
							streetViewControl={false}
							zoomControlOptions={{
								position: 8,
							}}
							mapTypeControlOptions={{
								mapTypeIds: ["satellite", "roadmap"],
								position: 5,
							}}
							className="w-full h-full"
							mapTypeId="roadmap"
							center={{ lat: coordinates.latitude, lng: coordinates.longitude }}
						>
							<Marker
								clickable
								title={input.name}
								position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
							/>
						</Map>
					)}
				</GoogleMaps>
			</div>
		</Fragment>
	);
};

interface PropTypes {
	input: LocationInput;
	coordinates: Coordinates | null;
	onChange: Dispatch<SetStateAction<LocationInput>>;
}

export default LocationForm;
