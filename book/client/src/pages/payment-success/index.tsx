// import { useQuery } from "@apollo/client";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { FC, createElement } from "react";
import { Link } from "react-router-dom";

// import AddToCalender from "../../components/add-to-calender";
import Button from "../../components/button";

// import {
// 	GetPaymentSuccessDataQuery,
// 	GetPaymentSuccessDataQueryVariables,
// 	Session,
// } from "../../generated-types";

// import GET_PAYMENT_SUCCESS_DATA from "./get-payment-success-data.graphql";

const PaymentSuccessPage: FC = () => (
	<div className="p-4 flex flex-col gap-6 items-center justify-center h-full">
		<h1 className="text-3xl">You Have Booked!</h1>
		<h1 className="text-xl">Congratulations</h1>
		<div className="flex flex-col gap-4 items-center">
			<Link to="/">
				<Button
					text="Finish"
					ariaLabel="Finish"
					className="!h-14 shadow-xl hover:shadow-xl rounded-xl gap-4"
					leftIcon={className => <CheckIcon className={`${className} h-7 w-7`} />}
				/>
			</Link>
		</div>
	</div>
);

// type Data = GetPaymentSuccessDataQuery;
// type Vars = GetPaymentSuccessDataQueryVariables;

export default PaymentSuccessPage;
