CREATE TABLE IF NOT EXISTS session (

	session_id UUID NOT NULL DEFAULT gen_random_uuid(),

	title VARCHAR(255) NOT NULL,
	notes VARCHAR(1024),
	price SMALLINT,
	equipment_fee SMALLINT,
	start_time INTEGER NOT NULL,
	end_time INTEGER NOT NULL,
	course_id UUID NOT NULL,
	location_id UUID NOT NULL,
	capacity_available SMALLINT NOT NULL,
	equipment_available SMALLINT,
	is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT session_pk
		PRIMARY KEY (session_id),

	CONSTRAINT course_fk_location_id
		FOREIGN KEY (location_id)
		REFERENCES location (location_id),

	CONSTRAINT session_check_price
		CHECK (price > 0),

	CONSTRAINT session_check_equipment_fee
		CHECK (equipment_fee > 0),

	CONSTRAINT session_check_end_time
		CHECK (end_time > start_time),

	CONSTRAINT session_check_duration
		CHECK (end_time - start_time <= 60 * 60 * 4),

	CONSTRAINT session_fk_course_id
		FOREIGN KEY (course_id)
		REFERENCES course (course_id)
		ON UPDATE CASCADE,

	CONSTRAINT session_fk_location_id
		FOREIGN KEY (location_id)
		REFERENCES location (location_id)
		ON UPDATE CASCADE,

	CONSTRAINT session_check_capacity_available
		CHECK (capacity_available > 0),

	CONSTRAINT session_check_equipment_available
		CHECK (equipment_available > 0),

	CONSTRAINT session_check_capacity_and_equipment_available
		CHECK (capacity_available >= equipment_available),

	CONSTRAINT session_check_created_at
		CHECK (created_at <= get_now())
);