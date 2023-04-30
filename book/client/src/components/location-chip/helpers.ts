export const getLocation = () =>
	new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			position => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			reject,
			{
				timeout: 5000,
				enableHighAccuracy: true,
			},
		);
	});

export const createGoogleMapsDirectionsURL = (
	location: google.maps.LatLngLiteral,
	destination: google.maps.LatLngLiteral,
) => {
	// Reference: https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
	const url = new URL("https://maps.apple.com");
	url.searchParams.append("dirflg", "d");
	url.searchParams.append("saddr", `${location.lat},${location.lng}`);
	url.searchParams.append("daddr", `${destination.lat},${destination.lng}`);
	return url;
};

export const createOpenInGoogleMapsURL = ({ lat, lng }: google.maps.LatLngLiteral) => {
	// Reference: https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
	const url = new URL("https://maps.apple.com");
	// url.searchParams.append("ll", `${lat},${lng}`);
	url.searchParams.append("z", "15");
	url.searchParams.append("q", `${lat},${lng}`);
	return url;
};
