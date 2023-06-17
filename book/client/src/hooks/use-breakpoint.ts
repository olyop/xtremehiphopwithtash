import { useEffect, useState } from "react";

export enum Breakpoint {
	TINY,
	SMALL,
	MEDIUM,
	LARGE,
}

const determineBreakpoint = (): Breakpoint => {
	if (window.innerWidth < 400) {
		return Breakpoint.TINY;
	} else if (window.innerWidth < 768) {
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

			setValue(prevState => {
				if (prevState === breakpoint) {
					return breakpoint;
				} else {
					return breakpoint;
				}
			});
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
