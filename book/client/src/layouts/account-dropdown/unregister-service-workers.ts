export const unregisterServiceWorkers = async () => {
	if ("serviceWorker" in navigator) {
		const registrations = await navigator.serviceWorker.getRegistrations();

		for (const registration of registrations) {
			await registration.unregister();
		}
	}
};
