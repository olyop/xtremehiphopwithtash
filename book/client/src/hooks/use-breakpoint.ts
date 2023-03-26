import { useEffect, useState } from "react";

export enum Breakpoint {
	SMALL = 0,
	MEDIUM = 1,
	LARGE = 2,
}

export const useBreakpoint = () => {
	const [value, setValue] = useState<Breakpoint>(Breakpoint.SMALL);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setValue(Breakpoint.SMALL);
			} else if (window.innerWidth < 1024) {
				setValue(Breakpoint.MEDIUM);
			} else {
				setValue(Breakpoint.LARGE);
			}
		};

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return value;
};
