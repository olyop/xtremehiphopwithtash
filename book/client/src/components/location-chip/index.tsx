import ArrowTopRightOnSquareIcon from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import MapIcon from "@heroicons/react/24/solid/MapIcon";
import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import { Location } from "../../generated-types";
import { useModal } from "../../hooks";
import { GoogleMaps } from "../../providers/google-maps";
import Button from "../button";
import Chip from "../chip";
import CopyButton from "../copy-button";
import { Map, Marker } from "../google-maps";
import Modal from "../modal";
import { createGoogleMapsDirectionsURL, createOpenInGoogleMapsURL, getLocation } from "./helpers";

const LocationChip: FC<Props> = ({ location }) => {
	const [isOpen, openModal, closeModal] = useModal();
	const [directionsLoading, setDirectionsLoading] = useState(false);
	const [directionsButtonLabel, setDirectionsButtonLabel] = useState("Directions");

	const lat = location.coordinates.latitude;
	const lng = location.coordinates.longitude;

	const handleOpenInGoogleMaps = () => {
		const url = createOpenInGoogleMapsURL({ lat, lng });
		window.open(url, "_blank");
	};

	const getDirections = async () => {
		try {
			const userLocation = await getLocation();
			const url = createGoogleMapsDirectionsURL(userLocation, { lat, lng });
			window.open(url);
			setDirectionsButtonLabel("Get Directions");
		} catch (error) {
			setDirectionsButtonLabel(error instanceof GeolocationPositionError ? error.message : "Error");
		} finally {
			setDirectionsLoading(false);
		}
	};

	const handleGetDirections = () => {
		setDirectionsButtonLabel("Getting Directions...");
		setDirectionsLoading(true);
	};

	useEffect(() => {
		if (directionsLoading) {
			void getDirections();
		}
	}, [directionsLoading]);

	return (
		<Fragment>
			<Chip
				key={location.locationID}
				onClick={openModal}
				chip={{
					chipID: location.locationID,
					text: location.name,
					icon: iconClassName => <MapPinIcon className={iconClassName} />,
				}}
			/>
			<Modal
				isLarge
				isOpen={isOpen}
				onClose={closeModal}
				title={location.name}
				contentClassName="flex flex-col gap-4"
				icon={iconClassName => <MapPinIcon className={iconClassName} />}
				children={
					<Fragment>
						<div className="flex flex-col items-start gap-1.5">
							<div className="flex gap-1 items-center">
								<p className="whitespace-nowrap">
									Plus Code: <span className="text-gray-500">{location.plusCode}</span>
								</p>
								<CopyButton ariaLabel="Copy Plus Code" text={location.plusCode} buttonDimension={6} iconDimension={4} />
							</div>
							<Chip
								chip={{
									chipID: location.locationID,
									text: "Paste into Google Maps",
									icon: iconClassName => <InformationCircleIcon className={iconClassName} />,
								}}
							/>
						</div>
						<div className="flex gap-1 items-center">
							<p className="text-sm">{location.address}</p>
							<CopyButton ariaLabel="Copy Address" text={location.address} buttonDimension={6} iconDimension={4} />
						</div>
						<div className="flex flex-col items-start gap-4">
							<div className="w-full overflow-hidden bg-gray-100 rounded h-[22rem]">
								<GoogleMaps>
									<Map
										zoom={15}
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
										center={{ lat, lng }}
									>
										<Marker position={{ lat, lng }} clickable title={location.name} optimized />
									</Map>
								</GoogleMaps>
							</div>
						</div>
					</Fragment>
				}
				buttons={
					<Fragment>
						<Button
							text="Open"
							ariaLabel="Open In Google Maps"
							onClick={handleOpenInGoogleMaps}
							leftIcon={iconClassName => <MapIcon className={iconClassName} />}
						/>
						<Button
							text={directionsButtonLabel}
							onClick={handleGetDirections}
							ariaLabel={directionsButtonLabel}
							leftIcon={iconClassName => <ArrowTopRightOnSquareIcon className={iconClassName} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

interface Props {
	location: Location;
}

export default LocationChip;
