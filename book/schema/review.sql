CREATE TABLE IF NOT EXISTS review (

	review_id UUID NOT NULL DEFAULT gen_random_uuid(),

	score SMALLINT NOT NULL,
	comment VARCHAR(1024) NOT NULL,
	course_id UUID NOT NULL,
	student_id VARCHAR(255) NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT review_pk
		PRIMARY KEY (review_id),

	CONSTRAINT review_fk_course_id
		FOREIGN KEY (course_id)
		REFERENCES course (course_id)
		ON UPDATE CASCADE,

	CONSTRAINT review_fk_student_id
		FOREIGN KEY (student_id)
		REFERENCES student (student_id)
		ON UPDATE CASCADE,

	CONSTRAINT review_check_score
		CHECK (score >= 1 AND score <= 5),

	CONSTRAINT review_check_created_at
		CHECK (created_at <= get_now())
);