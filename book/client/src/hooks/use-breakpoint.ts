import { useEffect, useState } from "react";

export enum Breakpoint {
	SMALL = 0,
	MEDIUM = 1,
	LARGE = 2,
}

const determineBreakpoint = (): Breakpoint => {
	if (window.innerWidth < 768) {
		return Breakpoint.SMALL;
	} else if (window.innerWidth < 1024) {
		return Breakpoint.MEDIUM;
	} else {
		return Breakpoint.LARGE;
	}
};

export const useBreakpoint = () => {
	const [value, setValue] = useState<Breakpoint>(determineBreakpoint());

	useEffect(() => {
		const handleResize = () => {
			const breakpoint = determineBreakpoint();

			if (breakpoint !== value) {
				setValue(breakpoint);
			}
		};

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Remove event listener on cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return value;
};
