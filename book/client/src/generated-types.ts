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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	LikertScale: number;
	NonNegativeInt: number;
	PositiveInt: number;
	URL: string;
	UUID: string;
	UnixTime: number;
};

export type Booking = {
	readonly __typename: "Booking";
	readonly bookingID: Scalars["UUID"];
	readonly createdAt: Scalars["UnixTime"];
	readonly isBringingOwnEquipment: Scalars["Boolean"];
	readonly notes: Maybe<Scalars["String"]>;
	readonly session: Session;
	readonly student: Student;
};

export type BookingInput = {
	readonly isBringingOwnEquipment: Scalars["Boolean"];
	readonly notes: InputMaybe<Scalars["String"]>;
	readonly sessionID: Scalars["UUID"];
};

export type Coordinates = {
	readonly __typename: "Coordinates";
	readonly latitude: Scalars["Float"];
	readonly longitude: Scalars["Float"];
};

export type Course = {
	readonly __typename: "Course";
	readonly courseID: Scalars["UUID"];
	readonly createdAt: Scalars["UnixTime"];
	readonly defaultCapacity: Scalars["PositiveInt"];
	readonly defaultDuration: Scalars["PositiveInt"];
	readonly defaultEquipmentAvailable: Maybe<Scalars["PositiveInt"]>;
	readonly defaultEquipmentFee: Maybe<Scalars["PositiveInt"]>;
	readonly defaultInstructors: ReadonlyArray<Instructor>;
	readonly defaultLocation: Location;
	readonly defaultPrice: Maybe<Scalars["PositiveInt"]>;
	readonly description: Scalars["String"];
	readonly name: Scalars["String"];
	readonly photo: Scalars["URL"];
	readonly reviews: ReadonlyArray<Review>;
};

export type CourseInput = {
	readonly defaultCapacity: Scalars["PositiveInt"];
	readonly defaultDuration: Scalars["PositiveInt"];
	readonly defaultEquipmentAvailable: InputMaybe<Scalars["PositiveInt"]>;
	readonly defaultEquipmentFee: InputMaybe<Scalars["PositiveInt"]>;
	readonly defaultInstructorIDs: ReadonlyArray<Scalars["UUID"]>;
	readonly defaultLocationID: Scalars["UUID"];
	readonly defaultPrice: InputMaybe<Scalars["PositiveInt"]>;
	readonly description: Scalars["String"];
	readonly name: Scalars["String"];
	readonly photo: Scalars["URL"];
};

export type Details = {
	readonly __typename: "Details";
	readonly createdAt: Scalars["UnixTime"];
	readonly detailsID: Scalars["UUID"];
	readonly firstName: Scalars["String"];
	readonly gender: Maybe<Scalars["String"]>;
	readonly instagramUsername: Maybe<Scalars["String"]>;
	readonly lastName: Scalars["String"];
	readonly mobilePhoneNumber: Scalars["String"];
	readonly nickName: Maybe<Scalars["String"]>;
};

export type DetailsInput = {
	readonly firstName: Scalars["String"];
	readonly gender: InputMaybe<Scalars["String"]>;
	readonly instagramUsername: InputMaybe<Scalars["String"]>;
	readonly lastName: Scalars["String"];
	readonly mobilePhoneNumber: Scalars["String"];
	readonly nickName: InputMaybe<Scalars["String"]>;
};

export type GetSessionsInput = {
	readonly courseID: InputMaybe<Scalars["UUID"]>;
	readonly endTime: Scalars["UnixTime"];
	readonly startTime: Scalars["UnixTime"];
};

export type Instructor = {
	readonly __typename: "Instructor";
	readonly createdAt: Scalars["UnixTime"];
	readonly details: Details;
	readonly instructorID: Scalars["UUID"];
	readonly photo: Scalars["URL"];
};

export type InstructorInput = {
	readonly details: DetailsInput;
	readonly photo: Scalars["URL"];
};

export type Location = {
	readonly __typename: "Location";
	readonly address: Scalars["String"];
	readonly coordinates: Coordinates;
	readonly createdAt: Scalars["UnixTime"];
	readonly locationID: Scalars["UUID"];
	readonly name: Scalars["String"];
	readonly plusCode: Scalars["String"];
};

export type LocationInput = {
	readonly address: Scalars["String"];
	readonly name: Scalars["String"];
	readonly plusCode: Scalars["String"];
};

export type Mutation = {
	readonly __typename: "Mutation";
	readonly createBookingFree: Booking;
	readonly createBookingReferralCode: Booking;
	readonly createCourse: Course;
	readonly createInstructor: Instructor;
	readonly createLocation: Location;
	readonly createSession: Session;
	readonly createStudent: Student;
	readonly deleteBookingByID: Scalars["UUID"];
	readonly deleteCourseByID: Scalars["UUID"];
	readonly deleteInstructorByID: Scalars["UUID"];
	readonly deleteLocationByID: Scalars["UUID"];
	readonly deleteSessionByID: Scalars["UUID"];
	readonly generateReferralCode: Scalars["String"];
	readonly updateBookingByID: Booking;
	readonly updateCourseByID: Course;
	readonly updateInstructorByID: Instructor;
	readonly updateLocationByID: Location;
	readonly updateSessionByID: Session;
	readonly updateStudentByID: Student;
};

export type MutationCreateBookingFreeArgs = {
	input: BookingInput;
	studentID: Scalars["String"];
};

export type MutationCreateBookingReferralCodeArgs = {
	code: Scalars["String"];
	input: BookingInput;
	studentID: Scalars["String"];
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

export type MutationCreateSessionArgs = {
	input: SessionInput;
};

export type MutationCreateStudentArgs = {
	input: DetailsInput;
	studentID: Scalars["String"];
};

export type MutationDeleteBookingByIdArgs = {
	bookingID: Scalars["UUID"];
};

export type MutationDeleteCourseByIdArgs = {
	courseID: Scalars["UUID"];
};

export type MutationDeleteInstructorByIdArgs = {
	instructorID: Scalars["UUID"];
};

export type MutationDeleteLocationByIdArgs = {
	locationID: Scalars["UUID"];
};

export type MutationDeleteSessionByIdArgs = {
	sessionID: Scalars["UUID"];
};

export type MutationUpdateBookingByIdArgs = {
	bookingID: Scalars["UUID"];
	input: BookingInput;
};

export type MutationUpdateCourseByIdArgs = {
	courseID: Scalars["UUID"];
	input: CourseInput;
};

export type MutationUpdateInstructorByIdArgs = {
	input: InstructorInput;
	instructorID: Scalars["UUID"];
};

export type MutationUpdateLocationByIdArgs = {
	input: LocationInput;
	locationID: Scalars["UUID"];
};

export type MutationUpdateSessionByIdArgs = {
	input: SessionInput;
	sessionID: Scalars["UUID"];
};

export type MutationUpdateStudentByIdArgs = {
	input: DetailsInput;
	studentID: Scalars["String"];
};

export type Place = {
	readonly __typename: "Place";
	readonly address: Scalars["String"];
	readonly coordinates: Coordinates;
	readonly plusCode: Scalars["String"];
};

export type Query = {
	readonly __typename: "Query";
	readonly decodePlusCode: Coordinates;
	readonly doesSessionExist: Scalars["Boolean"];
	readonly doesStudentExist: Scalars["Boolean"];
	readonly getBookingByID: Booking;
	readonly getBookings: ReadonlyArray<Booking>;
	readonly getCourseByID: Course;
	readonly getCourses: ReadonlyArray<Course>;
	readonly getGenders: ReadonlyArray<Scalars["String"]>;
	readonly getInstructorByID: Instructor;
	readonly getInstructors: ReadonlyArray<Instructor>;
	readonly getLocationByID: Location;
	readonly getLocations: ReadonlyArray<Location>;
	readonly getSessionByID: Session;
	readonly getSessionsInPeriod: ReadonlyArray<Session>;
	readonly getStudentByID: Student;
	readonly getStudents: ReadonlyArray<Student>;
	readonly isEquipmentAvailable: Scalars["Boolean"];
	readonly isStudentAdministator: Scalars["Boolean"];
	readonly searchPlaceByName: Maybe<Place>;
	readonly verifyReferralCode: Scalars["Boolean"];
};

export type QueryDecodePlusCodeArgs = {
	plusCode: Scalars["String"];
};

export type QueryDoesSessionExistArgs = {
	sessionID: Scalars["UUID"];
};

export type QueryDoesStudentExistArgs = {
	studentID: Scalars["String"];
};

export type QueryGetBookingByIdArgs = {
	bookingID: Scalars["UUID"];
};

export type QueryGetCourseByIdArgs = {
	courseID: Scalars["UUID"];
};

export type QueryGetInstructorByIdArgs = {
	instructorID: Scalars["UUID"];
};

export type QueryGetLocationByIdArgs = {
	locationID: Scalars["UUID"];
};

export type QueryGetSessionByIdArgs = {
	sessionID: Scalars["UUID"];
};

export type QueryGetSessionsInPeriodArgs = {
	input: GetSessionsInput;
};

export type QueryGetStudentByIdArgs = {
	studentID: Scalars["String"];
};

export type QueryIsEquipmentAvailableArgs = {
	sessionID: Scalars["UUID"];
};

export type QueryIsStudentAdministatorArgs = {
	studentID: Scalars["String"];
};

export type QuerySearchPlaceByNameArgs = {
	name: Scalars["String"];
};

export type QueryVerifyReferralCodeArgs = {
	code: Scalars["String"];
};

export type Review = {
	readonly __typename: "Review";
	readonly comment: Scalars["String"];
	readonly course: Course;
	readonly createdAt: Scalars["Int"];
	readonly reviewID: Scalars["UUID"];
	readonly score: Scalars["LikertScale"];
	readonly student: Student;
};

export type Session = {
	readonly __typename: "Session";
	readonly bookings: Maybe<ReadonlyArray<Booking>>;
	readonly bookingsTotal: Maybe<Scalars["PositiveInt"]>;
	readonly capacity: Scalars["PositiveInt"];
	readonly capacityRemaining: Maybe<Scalars["PositiveInt"]>;
	readonly course: Course;
	readonly createdAt: Scalars["UnixTime"];
	readonly endTime: Scalars["UnixTime"];
	readonly equipmentAvailable: Scalars["PositiveInt"];
	readonly equipmentFee: Maybe<Scalars["PositiveInt"]>;
	readonly equipmentLeft: Scalars["PositiveInt"];
	readonly instructors: ReadonlyArray<Instructor>;
	readonly location: Location;
	readonly notes: Maybe<Scalars["String"]>;
	readonly price: Maybe<Scalars["PositiveInt"]>;
	readonly sessionID: Scalars["UUID"];
	readonly startTime: Scalars["UnixTime"];
	readonly title: Scalars["String"];
};

export type SessionInput = {
	readonly capacity: Scalars["PositiveInt"];
	readonly courseID: Scalars["UUID"];
	readonly endTime: Scalars["UnixTime"];
	readonly equipmentAvailable: InputMaybe<Scalars["PositiveInt"]>;
	readonly equipmentFee: InputMaybe<Scalars["PositiveInt"]>;
	readonly instructorIDs: ReadonlyArray<Scalars["UUID"]>;
	readonly locationID: Scalars["UUID"];
	readonly notes: InputMaybe<Scalars["String"]>;
	readonly price: InputMaybe<Scalars["PositiveInt"]>;
	readonly startTime: Scalars["UnixTime"];
	readonly title: Scalars["String"];
};

export type Student = {
	readonly __typename: "Student";
	readonly bookings: Maybe<ReadonlyArray<Booking>>;
	readonly bookingsTotal: Maybe<Scalars["PositiveInt"]>;
	readonly createdAt: Scalars["UnixTime"];
	readonly details: Details;
	readonly isAdministrator: Scalars["Boolean"];
	readonly reviews: ReadonlyArray<Review>;
	readonly studentID: Scalars["String"];
};

export type DeleteBookingMutationVariables = Exact<{
	bookingID: Scalars["UUID"];
}>;

export type DeleteBookingMutation = { readonly deleteBookingByID: string } & {
	readonly __typename: "Mutation";
};

export type UpdateBookingMutationVariables = Exact<{
	bookingID: Scalars["UUID"];
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
	>;
	readonly getLocations: ReadonlyArray<
		{ readonly locationID: string; readonly name: string } & { readonly __typename: "Location" }
	>;
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
			readonly defaultCapacity: number;
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
	>;
	readonly getLocations: ReadonlyArray<
		{ readonly locationID: string; readonly name: string } & { readonly __typename: "Location" }
	>;
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
	>;
} & { readonly __typename: "Query" };

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
			readonly capacityRemaining: number | null;
			readonly location: { readonly locationID: string; readonly name: string } & {
				readonly __typename: "Location";
			};
			readonly course: {
				readonly courseID: string;
				readonly name: string;
				readonly photo: string;
			} & { readonly __typename: "Course" };
		} & { readonly __typename: "Session" }
	>;
} & { readonly __typename: "Query" };

export type GetAccountPageQueryVariables = Exact<{
	studentID: Scalars["String"];
}>;

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
			readonly mobilePhoneNumber: string;
			readonly instagramUsername: string | null;
		} & { readonly __typename: "Details" };
		readonly bookings: ReadonlyArray<
			{
				readonly bookingID: string;
				readonly notes: string | null;
				readonly isBringingOwnEquipment: boolean;
				readonly createdAt: number;
				readonly session: {
					readonly sessionID: string;
					readonly title: string;
					readonly startTime: number;
					readonly endTime: number;
					readonly course: { readonly courseID: string; readonly name: string } & {
						readonly __typename: "Course";
					};
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
								readonly gender: string | null;
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
						readonly gender: string | null;
						readonly mobilePhoneNumber: string;
						readonly instagramUsername: string | null;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Student" };
			} & { readonly __typename: "Booking" }
		> | null;
	} & { readonly __typename: "Student" };
} & { readonly __typename: "Query" };

export type UpdateStudentMutationVariables = Exact<{
	studentID: Scalars["String"];
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
			readonly gender: string | null;
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
		readonly defaultCapacity: number;
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
					readonly gender: string | null;
					readonly mobilePhoneNumber: string;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Course" };
} & { readonly __typename: "Mutation" };

export type DeleteCourseMutationVariables = Exact<{
	courseID: Scalars["UUID"];
}>;

export type DeleteCourseMutation = { readonly deleteCourseByID: string } & {
	readonly __typename: "Mutation";
};

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
			readonly defaultCapacity: number;
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
						readonly gender: string | null;
						readonly mobilePhoneNumber: string;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Instructor" }
			>;
		} & { readonly __typename: "Course" }
	>;
} & { readonly __typename: "Query" };

export type UpdateCourseMutationVariables = Exact<{
	courseID: Scalars["UUID"];
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
		readonly defaultCapacity: number;
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
					readonly gender: string | null;
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
			readonly gender: string | null;
			readonly mobilePhoneNumber: string;
			readonly createdAt: number;
		} & { readonly __typename: "Details" };
	} & { readonly __typename: "Instructor" };
} & { readonly __typename: "Mutation" };

export type DeleteInstructorMutationVariables = Exact<{
	instructorID: Scalars["UUID"];
}>;

export type DeleteInstructorMutation = { readonly deleteInstructorByID: string } & {
	readonly __typename: "Mutation";
};

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
				readonly gender: string | null;
				readonly mobilePhoneNumber: string;
				readonly instagramUsername: string | null;
			} & { readonly __typename: "Details" };
		} & { readonly __typename: "Instructor" }
	>;
} & { readonly __typename: "Query" };

export type UpdateInstructorMutationVariables = Exact<{
	instructorID: Scalars["UUID"];
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
			readonly gender: string | null;
			readonly mobilePhoneNumber: string;
		} & { readonly __typename: "Details" };
	} & { readonly __typename: "Instructor" };
} & { readonly __typename: "Mutation" };

export type CreateLocationMutationVariables = Exact<{
	input: LocationInput;
}>;

export type CreateLocationMutation = {
	readonly createLocation: { readonly locationID: string; readonly name: string } & {
		readonly __typename: "Location";
	};
} & { readonly __typename: "Mutation" };

export type DeleteLocationMutationVariables = Exact<{
	locationID: Scalars["UUID"];
}>;

export type DeleteLocationMutation = { readonly deleteLocationByID: string } & {
	readonly __typename: "Mutation";
};

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
	>;
} & { readonly __typename: "Query" };

export type SearchPlaceByNameQueryVariables = Exact<{
	name: Scalars["String"];
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
	locationID: Scalars["UUID"];
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

export type GenerateReferalCodeMutationVariables = Exact<{ [key: string]: never }>;

export type GenerateReferalCodeMutation = { readonly generateReferralCode: string } & {
	readonly __typename: "Mutation";
};

export type GetStudentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetStudentsQuery = {
	readonly getStudents: ReadonlyArray<
		{
			readonly studentID: string;
			readonly bookingsTotal: number | null;
			readonly details: {
				readonly detailsID: string;
				readonly firstName: string;
				readonly lastName: string;
				readonly nickName: string | null;
				readonly gender: string | null;
				readonly mobilePhoneNumber: string;
				readonly instagramUsername: string | null;
			} & { readonly __typename: "Details" };
		} & { readonly __typename: "Student" }
	>;
} & { readonly __typename: "Query" };

export type CreateBookingFreeMutationVariables = Exact<{
	input: BookingInput;
	studentID: Scalars["String"];
}>;

export type CreateBookingFreeMutation = {
	readonly createBookingFree: { readonly bookingID: string } & { readonly __typename: "Booking" };
} & { readonly __typename: "Mutation" };

export type CreateBookingReferralCodeMutationVariables = Exact<{
	input: BookingInput;
	studentID: Scalars["String"];
	code: Scalars["String"];
}>;

export type CreateBookingReferralCodeMutation = {
	readonly createBookingReferralCode: { readonly bookingID: string } & {
		readonly __typename: "Booking";
	};
} & { readonly __typename: "Mutation" };

export type GetPaymentScreenSessionQueryVariables = Exact<{
	sessionID: Scalars["UUID"];
}>;

export type GetPaymentScreenSessionQuery = {
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
		readonly course: {
			readonly courseID: string;
			readonly name: string;
			readonly photo: string;
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
					readonly gender: string | null;
					readonly mobilePhoneNumber: string;
					readonly instagramUsername: string | null;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Session" };
} & { readonly __typename: "Query" };

export type VerifyReferralCodeQueryVariables = Exact<{
	code: Scalars["String"];
}>;

export type VerifyReferralCodeQuery = { readonly verifyReferralCode: boolean } & {
	readonly __typename: "Query";
};

export type GetSessionBookingsQueryVariables = Exact<{
	sessionID: Scalars["UUID"];
}>;

export type GetSessionBookingsQuery = {
	readonly getSessionByID: {
		readonly sessionID: string;
		readonly bookings: ReadonlyArray<
			{
				readonly bookingID: string;
				readonly notes: string | null;
				readonly isBringingOwnEquipment: boolean;
				readonly createdAt: number;
				readonly student: {
					readonly studentID: string;
					readonly details: {
						readonly detailsID: string;
						readonly firstName: string;
						readonly lastName: string;
						readonly nickName: string | null;
						readonly mobilePhoneNumber: string;
					} & { readonly __typename: "Details" };
				} & { readonly __typename: "Student" };
			} & { readonly __typename: "Booking" }
		> | null;
	} & { readonly __typename: "Session" };
} & { readonly __typename: "Query" };

export type DeleteSessionMutationVariables = Exact<{
	sessionID: Scalars["UUID"];
}>;

export type DeleteSessionMutation = { readonly deleteSessionByID: string } & {
	readonly __typename: "Mutation";
};

export type GetSessionPageQueryVariables = Exact<{
	sessionID: Scalars["UUID"];
}>;

export type GetSessionPageQuery = {
	readonly getSessionByID: {
		readonly sessionID: string;
		readonly title: string;
		readonly notes: string | null;
		readonly startTime: number;
		readonly endTime: number;
		readonly price: number | null;
		readonly equipmentFee: number | null;
		readonly capacity: number;
		readonly equipmentAvailable: number;
		readonly capacityRemaining: number | null;
		readonly bookingsTotal: number | null;
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
					readonly gender: string | null;
					readonly mobilePhoneNumber: string;
					readonly instagramUsername: string | null;
					readonly createdAt: number;
				} & { readonly __typename: "Details" };
			} & { readonly __typename: "Instructor" }
		>;
	} & { readonly __typename: "Session" };
} & { readonly __typename: "Query" };

export type UpdateSessionMutationVariables = Exact<{
	sessionID: Scalars["UUID"];
	input: SessionInput;
}>;

export type UpdateSessionMutation = {
	readonly updateSessionByID: { readonly sessionID: string } & { readonly __typename: "Session" };
} & { readonly __typename: "Mutation" };

export type CheckStudentQueryVariables = Exact<{
	studentID: Scalars["String"];
}>;

export type CheckStudentQuery = {
	readonly doesStudentExist: boolean;
	readonly isStudentAdministator: boolean;
} & { readonly __typename: "Query" };

export type CreateStudentMutationVariables = Exact<{
	studentID: Scalars["String"];
	input: DetailsInput;
}>;

export type CreateStudentMutation = {
	readonly createStudent: { readonly studentID: string } & { readonly __typename: "Student" };
} & { readonly __typename: "Mutation" };
