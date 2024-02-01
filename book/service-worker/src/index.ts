import { clientsClaim } from "workbox-core";
import { imageCache, offlineFallback, pageCache } from "workbox-recipes";

declare const self: ServiceWorkerGlobalScope;

// eslint-disable-next-line no-underscore-dangle
self.__WB_DISABLE_DEV_LOGS = true;

clientsClaim();

// eslint-disable-next-line unicorn/prefer-top-level-await
void self.skipWaiting().then(() => {
	pageCache();

	// staticResourceCache();

	imageCache({
		maxEntries: Number.POSITIVE_INFINITY,
		maxAgeSeconds: Number.POSITIVE_INFINITY,
	});

	offlineFallback({
		pageFallback: "index.html",
	});

	// eslint-disable-next-line no-useless-return
	return;
});
