/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	LikertScale: { input: number; output: number };
	NonNegativeInt: { input: number; output: number };
	PositiveInt: { input: number; output: number };
	URL: { input: string; output: string };
	UUID: { input: string; output: string };
	UnixTime: { input: number; output: number };
};

export type Booking = {
	readonly __typename: "Booking";
	readonly bookingID: Scalars["UUID"]["output"];
	readonly bookingQuantity: Scalars["PositiveInt"]["output"];
	readonly cost: Maybe<Scalars["Float"]["output"]>;
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly equipmentQuantity: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly isCancelled: Scalars["Boolean"]["output"];
	readonly isCheckedIn: Scalars["Boolean"]["output"];
	readonly notes: Maybe<Scalars["String"]["output"]>;
	readonly paymentIntentID: Maybe<Scalars["String"]["output"]>;
	readonly paymentMethod: Maybe<PaymentMethod>;
	readonly session: Session;
	readonly student: Student;
};

export type BookingCost = {
	readonly __typename: "BookingCost";
	readonly bookingCost: Scalars["NonNegativeInt"]["output"];
	readonly cardFee: Scalars["PositiveInt"]["output"];
	readonly cardSurcharge: Scalars["NonNegativeInt"]["output"];
	readonly cardSurchargeRatio: Scalars["Float"]["output"];
	readonly cardSurchargeWithoutFee: Scalars["NonNegativeInt"]["output"];
	readonly cost: Scalars["NonNegativeInt"]["output"];
	readonly couponAmountToDiscount: Scalars["NonNegativeInt"]["output"];
	readonly couponDiscount: Scalars["Int"]["output"];
	readonly couponDiscountPercentage: Scalars["NonNegativeInt"]["output"];
	readonly equipmentCost: Scalars["NonNegativeInt"]["output"];
	readonly finalCost: Scalars["NonNegativeInt"]["output"];
	readonly isFreeFromCoupon: Scalars["Boolean"]["output"];
	readonly sessionCost: Scalars["NonNegativeInt"]["output"];
};

export type BookingInput = {
	readonly bookingQuantity: Scalars["PositiveInt"]["input"];
	readonly couponCode: InputMaybe<Scalars["String"]["input"]>;
	readonly equipmentQuantity: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly notes: InputMaybe<Scalars["String"]["input"]>;
	readonly paymentMethod: InputMaybe<PaymentMethod>;
	readonly sessionID: Scalars["UUID"]["input"];
};

export type Coordinates = {
	readonly __typename: "Coordinates";
	readonly latitude: Scalars["Float"]["output"];
	readonly longitude: Scalars["Float"]["output"];
};

export type Course = {
	readonly __typename: "Course";
	readonly courseID: Scalars["UUID"]["output"];
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly defaultCapacityAvailable: Scalars["PositiveInt"]["output"];
	readonly defaultDuration: Scalars["PositiveInt"]["output"];
	readonly defaultEquipmentAvailable: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly defaultEquipmentFee: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly defaultInstructors: ReadonlyArray<Instructor>;
	readonly defaultLocation: Location;
	readonly defaultPrice: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly description: Scalars["String"]["output"];
	readonly name: Scalars["String"]["output"];
	readonly photo: Scalars["URL"]["output"];
	readonly reviews: ReadonlyArray<Review>;
};

export type CourseInput = {
	readonly defaultCapacityAvailable: Scalars["PositiveInt"]["input"];
	readonly defaultDuration: Scalars["PositiveInt"]["input"];
	readonly defaultEquipmentAvailable: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly defaultEquipmentFee: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly defaultInstructorIDs: ReadonlyArray<Scalars["UUID"]["input"]>;
	readonly defaultLocationID: Scalars["UUID"]["input"];
	readonly defaultPrice: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly description: Scalars["String"]["input"];
	readonly name: Scalars["String"]["input"];
	readonly photo: Scalars["URL"]["input"];
};

export type CreatePaymentIntentResponse = {
	readonly __typename: "CreatePaymentIntentResponse";
	readonly clientSecret: Scalars["String"]["output"];
};

export type Details = {
	readonly __typename: "Details";
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly detailsID: Scalars["UUID"]["output"];
	readonly emailAddress: Scalars["String"]["output"];
	readonly firstName: Scalars["String"]["output"];
	readonly gender: Maybe<Scalars["String"]["output"]>;
	readonly instagramUsername: Maybe<Scalars["String"]["output"]>;
	readonly lastName: Scalars["String"]["output"];
	readonly mobilePhoneNumber: Scalars["String"]["output"];
	readonly nickName: Maybe<Scalars["String"]["output"]>;
};

export type DetailsInput = {
	readonly emailAddress: Scalars["String"]["input"];
	readonly firstName: Scalars["String"]["input"];
	readonly gender: InputMaybe<Scalars["String"]["input"]>;
	readonly instagramUsername: InputMaybe<Scalars["String"]["input"]>;
	readonly lastName: Scalars["String"]["input"];
	readonly mobilePhoneNumber: Scalars["String"]["input"];
	readonly nickName: InputMaybe<Scalars["String"]["input"]>;
};

export type GetSessionsInput = {
	readonly courseID: InputMaybe<Scalars["UUID"]["input"]>;
	readonly endTime: Scalars["UnixTime"]["input"];
	readonly startTime: Scalars["UnixTime"]["input"];
};

export type Instructor = {
	readonly __typename: "Instructor";
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly details: Details;
	readonly instructorID: Scalars["UUID"]["output"];
	readonly photo: Scalars["URL"]["output"];
};

export type InstructorInput = {
	readonly details: DetailsInput;
	readonly photo: Scalars["URL"]["input"];
};

export type Location = {
	readonly __typename: "Location";
	readonly address: Scalars["String"]["output"];
	readonly coordinates: Coordinates;
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly locationID: Scalars["UUID"]["output"];
	readonly name: Scalars["String"]["output"];
	readonly plusCode: Scalars["String"]["output"];
};

export type LocationInput = {
	readonly address: Scalars["String"]["input"];
	readonly name: Scalars["String"]["input"];
	readonly plusCode: Scalars["String"]["input"];
};

export type Mutation = {
	readonly __typename: "Mutation";
	readonly cancelBookingByID: Scalars["UUID"]["output"];
	readonly cancelSessionByID: Scalars["UUID"]["output"];
	readonly checkInBooking: Scalars["UUID"]["output"];
	readonly createBooking: Booking;
	readonly createCourse: Course;
	readonly createInstructor: Instructor;
	readonly createLocation: Location;
	readonly createPaymentIntent: CreatePaymentIntentResponse;
	readonly createSession: Session;
	readonly createStudent: Student;
	readonly deleteCourseByID: Scalars["UUID"]["output"];
	readonly deleteInstructorByID: Scalars["UUID"]["output"];
	readonly deleteLocationByID: Scalars["UUID"]["output"];
	readonly updateBookingByID: Booking;
	readonly updateCourseByID: Course;
	readonly updateInstructorByID: Instructor;
	readonly updateLocationByID: Location;
	readonly updateSessionByID: Session;
	readonly updateStudentByID: Student;
};

export type MutationCancelBookingByIdArgs = {
	bookingID: Scalars["UUID"]["input"];
	reCaptcha: Scalars["String"]["input"];
};

export type MutationCancelSessionByIdArgs = {
	sessionID: Scalars["UUID"]["input"];
};

export type MutationCheckInBookingArgs = {
	bookingID: Scalars["UUID"]["input"];
	value: Scalars["Boolean"]["input"];
};

export type MutationCreateBookingArgs = {
	input: BookingInput;
	reCaptcha: Scalars["String"]["input"];
};

export type MutationCreateCourseArgs = {
	input: CourseInput;
};

export type MutationCreateInstructorArgs = {
	input: InstructorInput;
};

export type MutationCreateLocationArgs = {
	input: LocationInput;
};

export type MutationCreatePaymentIntentArgs = {
	input: BookingInput;
	reCaptcha: Scalars["String"]["input"];
};

export type MutationCreateSessionArgs = {
	input: SessionInput;
};

export type MutationCreateStudentArgs = {
	input: DetailsInput;
};

export type MutationDeleteCourseByIdArgs = {
	courseID: Scalars["UUID"]["input"];
};

export type MutationDeleteInstructorByIdArgs = {
	instructorID: Scalars["UUID"]["input"];
};

export type MutationDeleteLocationByIdArgs = {
	locationID: Scalars["UUID"]["input"];
};

export type MutationUpdateBookingByIdArgs = {
	bookingID: Scalars["UUID"]["input"];
	input: BookingInput;
};

export type MutationUpdateCourseByIdArgs = {
	courseID: Scalars["UUID"]["input"];
	input: CourseInput;
};

export type MutationUpdateInstructorByIdArgs = {
	input: InstructorInput;
	instructorID: Scalars["UUID"]["input"];
};

export type MutationUpdateLocationByIdArgs = {
	input: LocationInput;
	locationID: Scalars["UUID"]["input"];
};

export type MutationUpdateSessionByIdArgs = {
	input: SessionInput;
	sessionID: Scalars["UUID"]["input"];
};

export type MutationUpdateStudentByIdArgs = {
	input: DetailsInput;
};

export enum PaymentMethod {
	CARD = "CARD",
	CASH = "CASH",
	COUPON = "COUPON",
}

export type Place = {
	readonly __typename: "Place";
	readonly address: Scalars["String"]["output"];
	readonly coordinates: Coordinates;
	readonly plusCode: Scalars["String"]["output"];
};

export type Query = {
	readonly __typename: "Query";
	readonly decodePlusCode: Coordinates;
	readonly doesStudentExist: Scalars["Boolean"]["output"];
	readonly getBookingByID: Booking;
	readonly getBookingCost: BookingCost;
	readonly getCourseByID: Course;
	readonly getCourses: Maybe<ReadonlyArray<Course>>;
	readonly getInstructorByID: Instructor;
	readonly getInstructors: Maybe<ReadonlyArray<Instructor>>;
	readonly getLocationByID: Location;
	readonly getLocations: Maybe<ReadonlyArray<Location>>;
	readonly getSessionByID: Session;
	readonly getSessionsInPeriod: ReadonlyArray<Session>;
	readonly getStudentByID: Student;
	readonly getStudents: Maybe<ReadonlyArray<Student>>;
	readonly isStudentAdministator: Scalars["Boolean"]["output"];
	readonly searchPlaceByName: Maybe<Place>;
	readonly verifyCoupon: Maybe<Scalars["String"]["output"]>;
};

export type QueryDecodePlusCodeArgs = {
	plusCode: Scalars["String"]["input"];
};

export type QueryGetBookingByIdArgs = {
	bookingID: Scalars["UUID"]["input"];
};

export type QueryGetBookingCostArgs = {
	bookingInput: BookingInput;
};

export type QueryGetCourseByIdArgs = {
	courseID: Scalars["UUID"]["input"];
};

export type QueryGetInstructorByIdArgs = {
	instructorID: Scalars["UUID"]["input"];
};

export type QueryGetLocationByIdArgs = {
	locationID: Scalars["UUID"]["input"];
};

export type QueryGetSessionByIdArgs = {
	sessionID: Scalars["UUID"]["input"];
};

export type QueryGetSessionsInPeriodArgs = {
	input: GetSessionsInput;
};

export type QuerySearchPlaceByNameArgs = {
	name: Scalars["String"]["input"];
};

export type QueryVerifyCouponArgs = {
	code: Scalars["String"]["input"];
};

export type Review = {
	readonly __typename: "Review";
	readonly comment: Scalars["String"]["output"];
	readonly course: Course;
	readonly createdAt: Scalars["Int"]["output"];
	readonly reviewID: Scalars["UUID"]["output"];
	readonly score: Scalars["LikertScale"]["output"];
	readonly student: Student;
};

export type Session = {
	readonly __typename: "Session";
	readonly bookings: Maybe<ReadonlyArray<Booking>>;
	readonly capacityAvailable: Scalars["PositiveInt"]["output"];
	readonly capacityBooked: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly capacityRemaining: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly course: Course;
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly endTime: Scalars["UnixTime"]["output"];
	readonly equipmentAvailable: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly equipmentFee: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly equipmentHired: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly equipmentRemaining: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly hasBooked: Scalars["Boolean"]["output"];
	readonly instructors: ReadonlyArray<Instructor>;
	readonly isCancelled: Scalars["Boolean"]["output"];
	readonly isCapacityRemaining: Scalars["Boolean"]["output"];
	readonly isEquipmentRemaining: Scalars["Boolean"]["output"];
	readonly location: Location;
	readonly notes: Maybe<Scalars["String"]["output"]>;
	readonly price: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly sessionID: Scalars["UUID"]["output"];
	readonly startTime: Scalars["UnixTime"]["output"];
	readonly title: Scalars["String"]["output"];
};

export type SessionIsCapacityRemainingArgs = {
	bookingQuantity: Scalars["PositiveInt"]["input"];
};

export type SessionIsEquipmentRemainingArgs = {
	equipmentQuantity: InputMaybe<Scalars["PositiveInt"]["input"]>;
};

export type SessionInput = {
	readonly capacityAvailable: Scalars["PositiveInt"]["input"];
	readonly courseID: Scalars["UUID"]["input"];
	readonly endTime: Scalars["UnixTime"]["input"];
	readonly equipmentAvailable: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly equipmentFee: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly instructorIDs: ReadonlyArray<Scalars["UUID"]["input"]>;
	readonly locationID: Scalars["UUID"]["input"];
	readonly notes: InputMaybe<Scalars["String"]["input"]>;
	readonly price: InputMaybe<Scalars["PositiveInt"]["input"]>;
	readonly startTime: Scalars["UnixTime"]["input"];
	readonly title: Scalars["String"]["input"];
};

export type Student = {
	readonly __typename: "Student";
	readonly bookings: Maybe<ReadonlyArray<Booking>>;
	readonly bookingsTotal: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly bookingsTotalPaymentMethodCard: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly bookingsTotalPaymentMethodCash: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly bookingsTotalPaymentMethodFree: Maybe<Scalars["PositiveInt"]["output"]>;
	readonly createdAt: Scalars["UnixTime"]["output"];
	readonly details: Details;
	readonly isAdministrator: Scalars["Boolean"]["output"];
	readonly reviews: ReadonlyArray<Review>;
	readonly studentID: Scalars["String"]["output"];
};

export type CancelBookingMutationVariables = Exact<{
	bookingID: Scalars["UUID"]["input"];
	reCaptcha: Scalars["String"]["input"];
}>;

export type CancelBookingMutation = { readonly cancelBookingByID: string } & { readonly __typename: "Mutation" };

export type CheckInBookingMutationVariables = Exact<{
	bookingID: Scalars["UUID"]["input"];
	value: Scalars["Boolean"]["input"];
}>;

export type CheckInBookingMutation = { readonly checkInBooking: string } & { readonly __typename: "Mutation" };

export type UpdateBookingMutationVariables = Exact<{
	bookingID: Scalars["UUID"]["input"];
	input: BookingInput;
}>;

export type UpdateBookingMutation = {
	readonly updateBookingByID: { readonly bookingID: string } & { readonly __typename: "Booking" };
} & { readonly __typename: "Mutation" };

export type GetCourseFormDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetCourseFormDataQuery = {
	readonly getInstructors: ReadonlyArray<
		{
			readonly instructorID: string;
			readonly photo: string;
			readonly details: {
				readonly detailsID: string;
				readonly firstName: string;
				readonly lastName: string;
				readonly nickName: string | null;
			} & { readonly __typename: "Details" };
		} & { readonly __typename: "Instructor" }
	> | null;
	readonly getLocations: ReadonlyArray<
		{ readonly locationID: string; readonly name: string } & { readonly __typename: "Location" }
	> | null;
} & { readonly __typename: "Query" };

export type GetSessionFormDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionFormDataQuery = {
	readonly getCourses: ReadonlyArray<
		{
			readonly courseID: string;
			readonly name: string;
			readonly photo: string;
			readonly defaultPrice: number | null;
			readonly defaultEquipmentFee: number | null;
			readonly defaultDuration: number;
			readonly defaultCapacityAvailable: number;
			readonly defaultEquipmentAvailable: number | null;
			readonly defaultLocation: {
				readonly locationID: string;
				readonly name: string;
				readonly plusCode: string;
				readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
					readonly __typename: "Coordinates";
				};
			} & { readonly __typename: "Location" };
			readonly defaultInstructors: ReadonlyArray<
				{
					readonly instructorID: string;
					readonly details: {
						readonly detailsID: string;
						readonly firstName: string;
						readonly lastName: string;
						readonly nickName: string | null;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Instructor" }
			>;
		} & { readonly __typename: "Course" }
	> | null;
	readonly getLocations: ReadonlyArray<
		{ readonly locationID: string; readonly name: string } & { readonly __typename: "Location" }
	> | null;
	readonly getInstructors: ReadonlyArray<
		{
			readonly instructorID: string;
			readonly photo: string;
			readonly details: {
				readonly detailsID: string;
				readonly firstName: string;
				readonly lastName: string;
				readonly nickName: string | null;
			} & { readonly __typename: "Details" };
		} & { readonly __typename: "Instructor" }
	> | null;
} & { readonly __typename: "Query" };

export type GetAccountPageQueryVariables = Exact<{ [key: string]: never }>;

export type GetAccountPageQuery = {
	readonly getStudentByID: {
		readonly studentID: string;
		readonly createdAt: number;
		readonly details: {
			readonly detailsID: string;
			readonly firstName: string;
			readonly lastName: string;
			readonly nickName: string | null;
			readonly gender: string | null;
			readonly emailAddress: string;
			readonly mobilePhoneNumber: string;
			readonly instagramUsername: string | null;
		} & { readonly __typename: "Details" };
		readonly bookings: ReadonlyArray<
			{
				readonly bookingID: string;
				readonly notes: string | null;
				readonly createdAt: number;
				readonly bookingQuantity: number;
				readonly equipmentQuantity: number | null;
				readonly paymentMethod: PaymentMethod | null;
				readonly cost: number | null;
				readonly isCheckedIn: boolean;
				readonly isCancelled: boolean;
				readonly session: {
					readonly sessionID: string;
					readonly title: string;
					readonly startTime: number;
					readonly endTime: number;
					readonly course: { readonly courseID: string; readonly name: string } & { readonly __typename: "Course" };
					readonly location: {
						readonly locationID: string;
						readonly name: string;
						readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
							readonly __typename: "Coordinates";
						};
					} & { readonly __typename: "Location" };
					readonly instructors: ReadonlyArray<
						{
							readonly instructorID: string;
							readonly details: {
								readonly detailsID: string;
								readonly firstName: string;
								readonly lastName: string;
								readonly nickName: string | null;
								readonly emailAddress: string;
								readonly mobilePhoneNumber: string;
								readonly instagramUsername: string | null;
							} & { readonly __typename: "Details" };
						} & { readonly __typename: "Instructor" }
					>;
				} & { readonly __typename: "Session" };
				readonly student: {
					readonly studentID: string;
					readonly details: {
						readonly detailsID: string;
						readonly firstName: string;
						readonly lastName: string;
						readonly nickName: string | null;
						readonly emailAddress: string;
						readonly mobilePhoneNumber: string;
						readonly instagramUsername: string | null;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Student" };
			} & { readonly __typename: "Booking" }
		> | null;
	} & { readonly __typename: "Student" };
} & { readonly __typename: "Query" };

export type UpdateStudentMutationVariables = Exact<{
	detailsInput: DetailsInput;
}>;

export type UpdateStudentMutation = {
	readonly updateStudentByID: {
		readonly studentID: string;
		readonly createdAt: number;
		readonly details: {
			readonly detailsID: string;
			readonly firstName: string;
			readonly lastName: string;
			readonly nickName: string | null;
			readonly emailAddress: string;
			readonly mobilePhoneNumber: string;
			readonly instagramUsername: string | null;
		} & { readonly __typename: "Details" };
	} & { readonly __typename: "Student" };
} & { readonly __typename: "Mutation" };

export type CreateCourseMutationVariables = Exact<{
	input: CourseInput;
}>;

export type CreateCourseMutation = {
	readonly createCourse: {
		readonly courseID: string;
		readonly name: string;
		readonly description: string;
		readonly photo: string;
		readonly defaultPrice: number | null;
		readonly defaultEquipmentFee: number | null;
		readonly defaultDuration: number;
		readonly defaultCapacityAvailable: number;
		readonly defaultEquipmentAvailable: number | null;
		readonly defaultLocation: { readonly locationID: string; readonly name: string } & {
			readonly __typename: "Location";
		};
		readonly defaultInstructors: ReadonlyArray<
			{
				readonly instructorID: string;
				readonly photo: string;
				readonly details: {
					readonly detailsID: string;
					readonly firstName: string;
					readonly lastName: string;
					readonly nickName: string | null;
					readonly mobilePhoneNumber: string;
					readonly emailAddress: string;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Course" };
} & { readonly __typename: "Mutation" };

export type DeleteCourseMutationVariables = Exact<{
	courseID: Scalars["UUID"]["input"];
}>;

export type DeleteCourseMutation = { readonly deleteCourseByID: string } & { readonly __typename: "Mutation" };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCoursesQuery = {
	readonly getCourses: ReadonlyArray<
		{
			readonly courseID: string;
			readonly name: string;
			readonly description: string;
			readonly photo: string;
			readonly defaultPrice: number | null;
			readonly defaultEquipmentFee: number | null;
			readonly defaultDuration: number;
			readonly defaultCapacityAvailable: number;
			readonly defaultEquipmentAvailable: number | null;
			readonly defaultLocation: {
				readonly locationID: string;
				readonly name: string;
				readonly plusCode: string;
				readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
					readonly __typename: "Coordinates";
				};
			} & { readonly __typename: "Location" };
			readonly defaultInstructors: ReadonlyArray<
				{
					readonly instructorID: string;
					readonly photo: string;
					readonly details: {
						readonly detailsID: string;
						readonly firstName: string;
						readonly lastName: string;
						readonly nickName: string | null;
						readonly emailAddress: string;
						readonly mobilePhoneNumber: string;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Instructor" }
			>;
		} & { readonly __typename: "Course" }
	> | null;
} & { readonly __typename: "Query" };

export type UpdateCourseMutationVariables = Exact<{
	courseID: Scalars["UUID"]["input"];
	input: CourseInput;
}>;

export type UpdateCourseMutation = {
	readonly updateCourseByID: {
		readonly courseID: string;
		readonly name: string;
		readonly description: string;
		readonly photo: string;
		readonly defaultPrice: number | null;
		readonly defaultEquipmentFee: number | null;
		readonly defaultDuration: number;
		readonly defaultCapacityAvailable: number;
		readonly defaultEquipmentAvailable: number | null;
		readonly defaultLocation: {
			readonly locationID: string;
			readonly name: string;
			readonly plusCode: string;
			readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
				readonly __typename: "Coordinates";
			};
		} & { readonly __typename: "Location" };
		readonly defaultInstructors: ReadonlyArray<
			{
				readonly instructorID: string;
				readonly photo: string;
				readonly details: {
					readonly detailsID: string;
					readonly firstName: string;
					readonly lastName: string;
					readonly nickName: string | null;
					readonly emailAddress: string;
					readonly mobilePhoneNumber: string;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Course" };
} & { readonly __typename: "Mutation" };

export type CreateInstructorMutationVariables = Exact<{
	input: InstructorInput;
}>;

export type CreateInstructorMutation = {
	readonly createInstructor: {
		readonly instructorID: string;
		readonly photo: string;
		readonly createdAt: number;
		readonly details: {
			readonly detailsID: string;
			readonly firstName: string;
			readonly lastName: string;
			readonly nickName: string | null;
			readonly mobilePhoneNumber: string;
			readonly emailAddress: string;
			readonly instagramUsername: string | null;
			readonly createdAt: number;
		} & { readonly __typename: "Details" };
	} & { readonly __typename: "Instructor" };
} & { readonly __typename: "Mutation" };

export type DeleteInstructorMutationVariables = Exact<{
	instructorID: Scalars["UUID"]["input"];
}>;

export type DeleteInstructorMutation = { readonly deleteInstructorByID: string } & { readonly __typename: "Mutation" };

export type GetInstructorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetInstructorsQuery = {
	readonly getInstructors: ReadonlyArray<
		{
			readonly instructorID: string;
			readonly photo: string;
			readonly details: {
				readonly detailsID: string;
				readonly firstName: string;
				readonly lastName: string;
				readonly nickName: string | null;
				readonly emailAddress: string;
				readonly mobilePhoneNumber: string;
				readonly instagramUsername: string | null;
				readonly createdAt: number;
			} & { readonly __typename: "Details" };
		} & { readonly __typename: "Instructor" }
	> | null;
} & { readonly __typename: "Query" };

export type UpdateInstructorMutationVariables = Exact<{
	instructorID: Scalars["UUID"]["input"];
	input: InstructorInput;
}>;

export type UpdateInstructorMutation = {
	readonly updateInstructorByID: {
		readonly instructorID: string;
		readonly photo: string;
		readonly details: {
			readonly detailsID: string;
			readonly firstName: string;
			readonly lastName: string;
			readonly nickName: string | null;
			readonly emailAddress: string;
			readonly mobilePhoneNumber: string;
			readonly instagramUsername: string | null;
			readonly createdAt: number;
		} & { readonly __typename: "Details" };
	} & { readonly __typename: "Instructor" };
} & { readonly __typename: "Mutation" };

export type CreateLocationMutationVariables = Exact<{
	input: LocationInput;
}>;

export type CreateLocationMutation = {
	readonly createLocation: { readonly locationID: string; readonly name: string } & { readonly __typename: "Location" };
} & { readonly __typename: "Mutation" };

export type DecodePlusCodeQueryVariables = Exact<{
	plusCode: Scalars["String"]["input"];
}>;

export type DecodePlusCodeQuery = {
	readonly decodePlusCode: { readonly latitude: number; readonly longitude: number } & {
		readonly __typename: "Coordinates";
	};
} & { readonly __typename: "Query" };

export type DeleteLocationMutationVariables = Exact<{
	locationID: Scalars["UUID"]["input"];
}>;

export type DeleteLocationMutation = { readonly deleteLocationByID: string } & { readonly __typename: "Mutation" };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetLocationsQuery = {
	readonly getLocations: ReadonlyArray<
		{
			readonly locationID: string;
			readonly name: string;
			readonly plusCode: string;
			readonly address: string;
			readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
				readonly __typename: "Coordinates";
			};
		} & { readonly __typename: "Location" }
	> | null;
} & { readonly __typename: "Query" };

export type SearchPlaceByNameQueryVariables = Exact<{
	name: Scalars["String"]["input"];
}>;

export type SearchPlaceByNameQuery = {
	readonly searchPlaceByName:
		| ({
				readonly address: string;
				readonly plusCode: string;
				readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
					readonly __typename: "Coordinates";
				};
		  } & { readonly __typename: "Place" })
		| null;
} & { readonly __typename: "Query" };

export type UpdateLocationMutationVariables = Exact<{
	locationID: Scalars["UUID"]["input"];
	input: LocationInput;
}>;

export type UpdateLocationMutation = {
	readonly updateLocationByID: {
		readonly locationID: string;
		readonly name: string;
		readonly plusCode: string;
		readonly address: string;
		readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
			readonly __typename: "Coordinates";
		};
	} & { readonly __typename: "Location" };
} & { readonly __typename: "Mutation" };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetStudentsQuery = {
	readonly getStudents: ReadonlyArray<
		{
			readonly studentID: string;
			readonly bookingsTotal: number | null;
			readonly bookingsTotalPaymentMethodFree: number | null;
			readonly bookingsTotalPaymentMethodCard: number | null;
			readonly bookingsTotalPaymentMethodCash: number | null;
			readonly details: {
				readonly detailsID: string;
				readonly firstName: string;
				readonly lastName: string;
				readonly nickName: string | null;
				readonly emailAddress: string;
				readonly mobilePhoneNumber: string;
				readonly instagramUsername: string | null;
			} & { readonly __typename: "Details" };
		} & { readonly __typename: "Student" }
	> | null;
} & { readonly __typename: "Query" };

export type GetPaymentSuccessDataQueryVariables = Exact<{
	sessionID: Scalars["UUID"]["input"];
}>;

export type GetPaymentSuccessDataQuery = {
	readonly getSessionByID: {
		readonly sessionID: string;
		readonly title: string;
		readonly price: number | null;
		readonly equipmentFee: number | null;
		readonly startTime: number;
		readonly endTime: number;
		readonly capacityRemaining: number | null;
		readonly location: {
			readonly locationID: string;
			readonly name: string;
			readonly plusCode: string;
			readonly address: string;
			readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
				readonly __typename: "Coordinates";
			};
		} & { readonly __typename: "Location" };
		readonly course: { readonly courseID: string; readonly name: string; readonly photo: string } & {
			readonly __typename: "Course";
		};
		readonly instructors: ReadonlyArray<
			{
				readonly instructorID: string;
				readonly photo: string;
				readonly details: {
					readonly detailsID: string;
					readonly firstName: string;
					readonly lastName: string;
					readonly nickName: string | null;
					readonly emailAddress: string;
					readonly mobilePhoneNumber: string;
					readonly instagramUsername: string | null;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Session" };
} & { readonly __typename: "Query" };

export type CreateBookingMutationVariables = Exact<{
	input: BookingInput;
	reCaptcha: Scalars["String"]["input"];
}>;

export type CreateBookingMutation = {
	readonly createBooking: { readonly bookingID: string } & { readonly __typename: "Booking" };
} & { readonly __typename: "Mutation" };

export type GetPaymentScreenDataQueryVariables = Exact<{
	sessionID: Scalars["UUID"]["input"];
	bookingInput: BookingInput;
}>;

export type GetPaymentScreenDataQuery = {
	readonly getSessionByID: {
		readonly sessionID: string;
		readonly title: string;
		readonly price: number | null;
		readonly equipmentFee: number | null;
		readonly startTime: number;
		readonly endTime: number;
		readonly capacityRemaining: number | null;
		readonly isCancelled: boolean;
		readonly location: {
			readonly locationID: string;
			readonly name: string;
			readonly plusCode: string;
			readonly address: string;
			readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
				readonly __typename: "Coordinates";
			};
		} & { readonly __typename: "Location" };
		readonly course: { readonly courseID: string; readonly name: string; readonly photo: string } & {
			readonly __typename: "Course";
		};
		readonly instructors: ReadonlyArray<
			{
				readonly instructorID: string;
				readonly photo: string;
				readonly details: {
					readonly detailsID: string;
					readonly firstName: string;
					readonly lastName: string;
					readonly nickName: string | null;
					readonly emailAddress: string;
					readonly mobilePhoneNumber: string;
					readonly instagramUsername: string | null;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Session" };
	readonly getBookingCost: {
		readonly sessionCost: number;
		readonly equipmentCost: number;
		readonly bookingCost: number;
		readonly couponDiscountPercentage: number;
		readonly couponAmountToDiscount: number;
		readonly couponDiscount: number;
		readonly cost: number;
		readonly isFreeFromCoupon: boolean;
		readonly cardFee: number;
		readonly cardSurchargeRatio: number;
		readonly cardSurcharge: number;
		readonly cardSurchargeWithoutFee: number;
		readonly finalCost: number;
	} & { readonly __typename: "BookingCost" };
} & { readonly __typename: "Query" };

export type CreatePaymentIntentMutationVariables = Exact<{
	input: BookingInput;
	reCaptcha: Scalars["String"]["input"];
}>;

export type CreatePaymentIntentMutation = {
	readonly createPaymentIntent: { readonly clientSecret: string } & {
		readonly __typename: "CreatePaymentIntentResponse";
	};
} & { readonly __typename: "Mutation" };

export type VerifyCouponQueryVariables = Exact<{
	code: Scalars["String"]["input"];
}>;

export type VerifyCouponQuery = { readonly verifyCoupon: string | null } & { readonly __typename: "Query" };

export type CreateSessionMutationVariables = Exact<{
	input: SessionInput;
}>;

export type CreateSessionMutation = {
	readonly createSession: { readonly sessionID: string } & { readonly __typename: "Session" };
} & { readonly __typename: "Mutation" };

export type GetSessionsInPeriodQueryVariables = Exact<{
	input: GetSessionsInput;
}>;

export type GetSessionsInPeriodQuery = {
	readonly getSessionsInPeriod: ReadonlyArray<
		{
			readonly sessionID: string;
			readonly title: string;
			readonly startTime: number;
			readonly endTime: number;
			readonly price: number | null;
			readonly hasBooked: boolean;
			readonly capacityRemaining: number | null;
			readonly isCancelled: boolean;
			readonly location: { readonly locationID: string; readonly name: string } & { readonly __typename: "Location" };
			readonly course: { readonly courseID: string; readonly name: string; readonly photo: string } & {
				readonly __typename: "Course";
			};
		} & { readonly __typename: "Session" }
	>;
} & { readonly __typename: "Query" };

export type GetSessionBookingsQueryVariables = Exact<{
	sessionID: Scalars["UUID"]["input"];
}>;

export type GetSessionBookingsQuery = {
	readonly getSessionByID: {
		readonly sessionID: string;
		readonly bookings: ReadonlyArray<
			{
				readonly bookingID: string;
				readonly notes: string | null;
				readonly createdAt: number;
				readonly bookingQuantity: number;
				readonly equipmentQuantity: number | null;
				readonly paymentMethod: PaymentMethod | null;
				readonly paymentIntentID: string | null;
				readonly cost: number | null;
				readonly isCheckedIn: boolean;
				readonly isCancelled: boolean;
				readonly session: { readonly sessionID: string } & { readonly __typename: "Session" };
				readonly student: {
					readonly studentID: string;
					readonly details: {
						readonly detailsID: string;
						readonly firstName: string;
						readonly lastName: string;
						readonly nickName: string | null;
						readonly emailAddress: string;
						readonly mobilePhoneNumber: string;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Student" };
			} & { readonly __typename: "Booking" }
		> | null;
	} & { readonly __typename: "Session" };
} & { readonly __typename: "Query" };

export type CancelSessionMutationVariables = Exact<{
	sessionID: Scalars["UUID"]["input"];
}>;

export type CancelSessionMutation = { readonly cancelSessionByID: string } & { readonly __typename: "Mutation" };

export type GetSessionPageQueryVariables = Exact<{
	sessionID: Scalars["UUID"]["input"];
}>;

export type GetSessionPageQuery = {
	readonly getSessionByID: {
		readonly sessionID: string;
		readonly title: string;
		readonly notes: string | null;
		readonly startTime: number;
		readonly endTime: number;
		readonly price: number | null;
		readonly hasBooked: boolean;
		readonly equipmentFee: number | null;
		readonly capacityAvailable: number;
		readonly capacityBooked: number | null;
		readonly capacityRemaining: number | null;
		readonly equipmentAvailable: number | null;
		readonly equipmentHired: number | null;
		readonly equipmentRemaining: number | null;
		readonly isCapacityRemaining: boolean;
		readonly isEquipmentRemaining: boolean;
		readonly isCancelled: boolean;
		readonly createdAt: number;
		readonly location: {
			readonly locationID: string;
			readonly name: string;
			readonly plusCode: string;
			readonly address: string;
			readonly coordinates: { readonly latitude: number; readonly longitude: number } & {
				readonly __typename: "Coordinates";
			};
		} & { readonly __typename: "Location" };
		readonly course: {
			readonly courseID: string;
			readonly name: string;
			readonly photo: string;
			readonly description: string;
		} & { readonly __typename: "Course" };
		readonly instructors: ReadonlyArray<
			{
				readonly instructorID: string;
				readonly photo: string;
				readonly details: {
					readonly detailsID: string;
					readonly firstName: string;
					readonly lastName: string;
					readonly nickName: string | null;
					readonly emailAddress: string;
					readonly mobilePhoneNumber: string;
					readonly instagramUsername: string | null;
					readonly createdAt: number;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Session" };
} & { readonly __typename: "Query" };

export type UpdateSessionMutationVariables = Exact<{
	sessionID: Scalars["UUID"]["input"];
	input: SessionInput;
}>;

export type UpdateSessionMutation = {
	readonly updateSessionByID: { readonly sessionID: string } & { readonly __typename: "Session" };
} & { readonly __typename: "Mutation" };

export type CheckStudentQueryVariables = Exact<{ [key: string]: never }>;

export type CheckStudentQuery = { readonly doesStudentExist: boolean; readonly isStudentAdministator: boolean } & {
	readonly __typename: "Query";
};

export type CreateStudentMutationVariables = Exact<{
	input: DetailsInput;
}>;

export type CreateStudentMutation = {
	readonly createStudent: { readonly studentID: string } & { readonly __typename: "Student" };
} & { readonly __typename: "Mutation" };
