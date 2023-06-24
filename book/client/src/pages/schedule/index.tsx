import { ApolloError } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { FC, createElement, useEffect, useRef, useState } from "react";

import FormError from "../../components/form-error";
import FullscreenSpinner from "../../components/fullscreen-spinner";
import { useBreakpoint, useHasMounted } from "../../hooks";
import Controls from "./controls";
import Days from "./days";
import { determineStartAndEndDate, generateDays, generateDaysWithSessions as generateSchedule } from "./generate";
import { determineDecrementAction, determineIncrementAction, getStartingTime, setStartingTime } from "./helpers";
import { Day as DayType } from "./types";
import WeekDays from "./week-days";

const Schedule: FC = () => {
	const apollo = useApolloClient();
	const breakpoint = useBreakpoint();
	const hasMounted = useHasMounted();
	const relativeDate = useRef(Date.now());

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApolloError | null>(null);

	const [days, setDays] = useState<DayType[]>(() => {
		const [startingDate, endingDate] = determineStartAndEndDate(new Date(getStartingTime()), breakpoint);

		return generateDays(breakpoint, startingDate, endingDate, []);
	});

	const handleSchedule = async (date: Date) => {
		setLoading(true);

		const unixTime = date.getTime();
		relativeDate.current = unixTime;
		setStartingTime(unixTime);
		const schedule = await generateSchedule(apollo)(unixTime, breakpoint);

		if (schedule instanceof ApolloError) {
			setError(schedule);
			setLoading(false);
			return;
		} else {
			setError(null);
		}

		setDays(schedule);
		setLoading(false);
	};

	const handleResetClick = () => {
		const date = new Date();
		void handleSchedule(date);
	};

	const handleBackOneWeekClick = () => {
		const date = new Date(relativeDate.current);
		const newDate = determineDecrementAction(breakpoint)(date);
		void handleSchedule(newDate);
	};

	const handleForwardOneWeekClick = () => {
		const date = new Date(relativeDate.current);
		const newDate = determineIncrementAction(breakpoint)(date);
		void handleSchedule(newDate);
	};

	const handleSessionsUpdate = () => {
		const date = new Date(getStartingTime());
		void handleSchedule(date);
	};

	useEffect(() => {
		if (hasMounted) {
			const date = new Date(getStartingTime());
			void handleSchedule(date);
		}
	}, [breakpoint]);

	useEffect(() => {
		if (!loading) {
			const date = new Date(getStartingTime());
			void handleSchedule(date);
		}
	}, []);

	return (
		<div className="h-full flex flex-col-reverse lg:grid lg:grid-rows-[1fr,_3.25rem] lg:items-start lg:grid-cols-[1fr_4.2rem]">
			<FullscreenSpinner isLoading={loading} backgroundClassName="!opacity-10" />
			{error ? (
				<div className="h-content-height w-full p-4 border-t">
					<FormError error={error} />
				</div>
			) : (
				<div className="lg:grid lg:grid-rows-[2.25rem,_auto]">
					<WeekDays />
					<Days days={days} onSessionUpdate={handleSessionsUpdate} />
				</div>
			)}
			<Controls
				breakpoint={breakpoint}
				onReset={handleResetClick}
				onBackOneWeek={handleBackOneWeekClick}
				isFirstDayToday={days[0]?.isToday ?? false}
				onForwardOneWeek={handleForwardOneWeekClick}
			/>
		</div>
	);
};

export default Schedule;
