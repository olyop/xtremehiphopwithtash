import { FC, Fragment, createElement } from "react";

import SessionCard from "../../components/session-card";
import { Session } from "../../generated-types";
import { currencyFormatter } from "../../intl";

const PaymentOverview: FC<PropTypes> = ({ session, price, notes, isBringingOwnEquipment }) => (
	<div className="p-6 flex flex-col gap-4 items-star border-b shadow-xl">
		<h1 className="text-2xl underline font-bold">Booking Overview</h1>
		<SessionCard
			session={session}
			className="!max-w-[40rem] !h-40 !shadow-none"
			imageClassName="!h-24"
			disableLink
		/>
		<div className="flex flex-col">
			<h4>
				<span className="text-gray-500">Notes:</span>
				<Fragment> </Fragment>
				{notes ?? "None"}
			</h4>
			<p>
				<span className="text-gray-500">Bringing Step:</span>
				<Fragment> </Fragment>
				{isBringingOwnEquipment ? "Yes" : "No"}
			</p>
		</div>
		<div className="w-full h-px bg-gray-300" />
		<div>
			<h5 className="font-bold text-3xl mb-1">Price:</h5>
			<div className="max-w-[40rem] grid grid-rows-[1fr,1fr,10px,1fr] grid-cols-2 font-mono text-lg">
				<p className="truncate">Session:</p>
				<p className="justify-self-end">{currencyFormatter.format(session.price ?? 0)}</p>
				<p className="truncate">Step Hire:</p>
				<p className="justify-self-end">
					{currencyFormatter.format(
						isBringingOwnEquipment || session.equipmentFee === null ? 0 : session.equipmentFee,
					)}
				</p>
				<div className="h-[2px] w-full bg-gray-500 my-[4px]" />
				<div className="h-[2px] w-full bg-gray-500 my-[4px]" />
				<p className="font-bold truncate">Total:</p>
				<p className="justify-self-end font-bold">{currencyFormatter.format(price ?? 0)}</p>
			</div>
		</div>
	</div>
);

interface PropTypes {
	session: Session;
	price: number | null;
	notes: string | null;
	isBringingOwnEquipment: boolean;
}

export default PaymentOverview;
