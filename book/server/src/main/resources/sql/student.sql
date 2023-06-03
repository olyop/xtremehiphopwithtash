CREATE TABLE IF NOT EXISTS student (

	student_id VARCHAR(255) NOT NULL,

	details_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT student_pk
		PRIMARY KEY (student_id),

	CONSTRAINT student_fk_details_id
		FOREIGN KEY (details_id)
		REFERENCES details (details_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,

	CONSTRAINT student_check_created_at
		CHECK (created_at <= get_now())
);