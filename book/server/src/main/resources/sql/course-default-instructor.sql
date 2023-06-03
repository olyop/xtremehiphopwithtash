CREATE TABLE IF NOT EXISTS course_default_instructor (

	course_id UUID NOT NULL,
	index SMALLINT NOT NULL,

	instructor_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT course_default_instructor_pk
		PRIMARY KEY (course_id, index),

	CONSTRAINT course_default_instructor_fk_course_id
		FOREIGN KEY (course_id)
		REFERENCES course (course_id)
		ON UPDATE CASCADE,

	CONSTRAINT course_default_instructor_fk_instructor_id
		FOREIGN KEY (instructor_id)
		REFERENCES instructor (instructor_id)
		ON UPDATE CASCADE,

	CONSTRAINT course_default_instructor_check_index
		CHECK (index >= 0),

	CONSTRAINT course_default_instructor_check_created_at
		CHECK (created_at <= get_now())
);