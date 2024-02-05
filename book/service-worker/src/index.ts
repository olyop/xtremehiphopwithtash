import { clientsClaim } from "workbox-core";
import { imageCache, offlineFallback, pageCache, staticResourceCache } from "workbox-recipes";

declare const self: ServiceWorkerGlobalScope;

// eslint-disable-next-line no-underscore-dangle
self.__WB_DISABLE_DEV_LOGS = true;

const run = async () => {
	clientsClaim();

	await self.skipWaiting();

	pageCache();

	staticResourceCache();

	imageCache({
		maxEntries: Number.POSITIVE_INFINITY,
		maxAgeSeconds: Number.POSITIVE_INFINITY,
	});

	offlineFallback({
		pageFallback: "index.html",
	});
};

void run();
