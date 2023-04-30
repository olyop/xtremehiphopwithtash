import { Wrapper as GoogleMapsWrapper, Status, WrapperProps } from "@googlemaps/react-wrapper";
import { FC, Fragment, PropsWithChildren, createElement } from "react";

const googleMapsRenderer: WrapperProps["render"] = status => {
	if (status === Status.LOADING) {
		return <p className="p-4">Loading map...</p>;
	} else if (status === Status.FAILURE) {
		return <p className="p-4">Error loading map...</p>;
	} else {
		return <Fragment />;
	}
};

export const GoogleMaps: FC<PropsWithChildren> = ({ children }) => (
	<GoogleMapsWrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} render={googleMapsRenderer}>
		{children}
	</GoogleMapsWrapper>
);
