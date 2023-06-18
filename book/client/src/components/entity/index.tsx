import { FC, Fragment, ReactNode, createElement } from "react";
import { Link } from "react-router-dom";

const Entity: FC<EntityPropTypes> = ({
	id,
	photo,
	text,
	description,
	isLeftALink = false,
	leftLink,
	rightContent,
	className,
	leftClassName,
	rightClassName,
}) => {
	const photoNode = photo && (
		<img src={photo} alt={text?.toString()} className="w-8 h-8 rounded-full shadow-md select-none" />
	);

	const textNode = (
		<Fragment>
			<p className="text-base">{text}</p>
			<p className="text-xs">{description}</p>
		</Fragment>
	);

	return (
		<div
			data-id={id}
			className={`flex items-start justify-between h-full p-2 border-b last:border-b-0 ${className ?? ""}`}
		>
			{isLeftALink && leftLink ? (
				<Link className={`"flex items-center gap-2 ${leftClassName ?? ""}`} to={leftLink}>
					{photoNode}
					<div>{textNode}</div>
				</Link>
			) : (
				<div className={`"flex items-center gap-2 ${leftClassName ?? ""}`}>
					{photoNode}
					<div>{textNode}</div>
				</div>
			)}
			{rightContent && <div className={`flex items-center ${rightClassName ?? ""}`}>{rightContent}</div>}
		</div>
	);
};

export interface EntityPropTypes {
	id: string;
	photo?: string | undefined;
	text: ReactNode;
	description: ReactNode;
	isLeftALink?: boolean;
	leftLink?: string;
	rightContent?: ReactNode;
	className?: string | undefined;
	leftClassName?: string | undefined;
	rightClassName?: string | undefined;
}

export default Entity;
