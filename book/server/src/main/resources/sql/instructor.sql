CREATE TABLE IF NOT EXISTS instructor (

	instructor_id UUID NOT NULL DEFAULT gen_random_uuid(),

	details_id UUID NOT NULL,
	photo VARCHAR(1024) NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT instructor_pk
		PRIMARY KEY (instructor_id),

	CONSTRAINT instructor_fk_details_id
		FOREIGN KEY (details_id)
		REFERENCES details (details_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,

	CONSTRAINT instructor_check_created_at
		CHECK (created_at <= get_now())
);