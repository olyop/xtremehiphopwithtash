import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { FC, createElement, useEffect, useState } from "react";

import Input, { InputOnChange, InputType } from "../../../components/input";
import { BookingTrend } from "../../../generated-types";
import { getTrends } from "./get-trends";

// 3 months ago
const DEFAULT_START_TIME = Date.now() - 86_400_000 * 60;

const convertUnixDayToDDMM = (unixDay: number) => {
	const date = new Date(unixDay / 1000);

	const month = date.getMonth() + 1;
	const day = date.getDate();

	const monthPart = month < 10 ? `0${month}` : month;
	const dayPart = day < 10 ? `0${day}` : day;

	return `${monthPart}\\${dayPart}`;
};

const AdminTrends: FC = () => {
	const apollo = useApolloClient();

	const [startTime, setStartTime] = useState(DEFAULT_START_TIME);
	const [endTime, setEndTime] = useState(Date.now());

	const [bookingTrends, setBookingTrends] = useState<BookingTrend[] | null>(null);

	const handleStartTimeChange: InputOnChange = value => {
		if (typeof value === "number") {
			setStartTime(value);
		}
	};

	const handleEndTimeChange: InputOnChange = value => {
		if (typeof value === "number") {
			setEndTime(value);
		}
	};

	const handleGetBookingTrends = async () => {
		setBookingTrends(await getTrends(apollo)({ startTime, endTime }));
	};

	useEffect(() => {
		void handleGetBookingTrends();
	}, [startTime, endTime]);

	if (!bookingTrends) {
		return <p>Loading...</p>;
	}

	return (
		<div className="flex flex-col items-start gap-4">
			<h2 className="text-2xl">Trends</h2>
			<div className="flex flex-col sm:flex-row gap-2 w-full">
				<Input
					id="startTime"
					name="Start Date"
					autoComplete="off"
					value={startTime}
					type={InputType.DATE}
					onChange={handleStartTimeChange}
				/>
				<Input
					id="endTime"
					name="End Date"
					autoComplete="off"
					value={endTime}
					type={InputType.DATE}
					onChange={handleEndTimeChange}
				/>
			</div>
			<div className="bg-white shadow-md w-full flex flex-row-reverse items-end p-4 rounded-2xl gap-1 overflow-x-scroll">
				{bookingTrends.map(({ bookings, unixDay }) => (
					<div key={unixDay} className="flex flex-col gap-2">
						<p
							className="text-xs font-mono"
							style={{
								textOrientation: "upright",
								writingMode: "vertical-rl",
								letterSpacing: "-4px",
								opacity: bookings === 0 ? "0" : "unset",
							}}
						>
							{bookings}
						</p>
						<div style={{ height: `${bookings * 20}px` }} className="w-full bg-primary rounded-sm" />
						<p
							className="text-xs font-mono"
							style={{ textOrientation: "upright", writingMode: "vertical-rl", letterSpacing: "-4px" }}
						>
							{convertUnixDayToDDMM(unixDay)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminTrends;
