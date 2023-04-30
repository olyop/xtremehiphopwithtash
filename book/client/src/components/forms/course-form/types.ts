import { Instructor } from "../../../generated-types";

export type OnInstructorDelete = ({ instructorID }: Pick<Instructor, "instructorID">) => () => void;
