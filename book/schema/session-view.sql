CREATE TABLE IF NOT EXISTS session_view (

	session_id uuid NOT NULL,
	student_id VARCHAR(255) NOT NULL,

	created_at integer NOT NULL DEFAULT get_now(),

	CONSTRAINT session_view_pk PRIMARY KEY (session_id, student_id),

	CONSTRAINT session_view_fk_session_id FOREIGN KEY (session_id) REFERENCES session (session_id) ON UPDATE CASCADE,

	CONSTRAINT session_view_fk_student_id FOREIGN KEY (student_id) REFERENCES student (student_id) ON UPDATE CASCADE,

	CONSTRAINT session_view_check_created_at CHECK (created_at <= get_now())
);
