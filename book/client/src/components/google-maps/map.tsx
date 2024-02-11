import {
	Children,
	FC,
	Fragment,
	PropsWithChildren,
	cloneElement,
	createElement,
	isValidElement,
	useEffect,
	useRef,
	useState,
} from "react";

export const Map: FC<PropsWithChildren<Props>> = ({ onClick, children, className, ...options }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, options));
		}
	}, [ref, map]);

	useEffect(() => {
		if (map) {
			["click", "idle"].forEach(eventName => {
				google.maps.event.clearListeners(map, eventName);
			});

			if (onClick) {
				map.addListener("click", onClick);
			}
		}
	}, [map, onClick]);

	return (
		<Fragment>
			<div ref={ref} className={className} />
			{Children.map(children, child => {
				if (isValidElement(child)) {
					// set the map prop on the child component
					// @ts-expect-error
					return cloneElement(child, { map });
				} else {
					return null;
				}
			})}
		</Fragment>
	);
};

interface Props extends google.maps.MapOptions {
	className?: string;
	onClick?: () => void;
}
