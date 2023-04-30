import { FC, PropsWithChildren, createContext, createElement, useState } from "react";

export const IsAdministratorContext = createContext<IsAdministratorType>({
	isAdministrator: false,
	setIsAdministrator: () => {},
});

export const IsAdministratorProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAdministrator, setIsAdministrator] = useState(false);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<IsAdministratorContext.Provider value={{ isAdministrator, setIsAdministrator }}>
			{children}
		</IsAdministratorContext.Provider>
	);
};

interface IsAdministratorType {
	isAdministrator: boolean;
	setIsAdministrator: (isAdministrator: boolean) => void;
}
