CREATE TABLE IF NOT EXISTS session_instructor (

	session_id UUID NOT NULL,
	index SMALLINT NOT NULL,

	instructor_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT session_instructor_pk
		PRIMARY KEY (session_id, index),

	CONSTRAINT session_instructor_fk_session_id
		FOREIGN KEY (session_id)
		REFERENCES session (session_id)
		ON UPDATE CASCADE,

	CONSTRAINT session_instructor_fk_instructor_id
		FOREIGN KEY (instructor_id)
		REFERENCES instructor (instructor_id)
		ON UPDATE CASCADE,

	CONSTRAINT session_instructor_check_index
		CHECK (index >= 0),

	CONSTRAINT session_instructor_check_created_at
		CHECK (created_at <= get_now())
);
