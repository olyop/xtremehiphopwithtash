import { FC, ReactNode, createElement } from "react";

const Entity: FC<EntityPropTypes> = ({ id, photo, text, description, rightContent }) => (
	<div
		data-id={id}
		className="flex items-start justify-between h-full p-2 border-b last:border-b-0"
	>
		<div className="flex items-center gap-2">
			{photo && (
				<img
					src={photo}
					alt={text?.toString()}
					className="w-8 h-8 rounded-full shadow-md select-none"
				/>
			)}
			<div>
				<p className="text-base">{text}</p>
				<p className="text-xs">{description}</p>
			</div>
		</div>
		{rightContent && <div className="flex items-center">{rightContent}</div>}
	</div>
);

export interface EntityPropTypes {
	id: string;
	photo?: string | undefined;
	text: ReactNode;
	description: ReactNode;
	rightContent?: ReactNode;
}

export default Entity;
