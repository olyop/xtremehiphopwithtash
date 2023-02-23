CREATE TYPE details_gender AS ENUM (
	'MALE',
	'FEMALE',
	'OTHER'
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE OR REPLACE FUNCTION
	get_now()
RETURNS
	INTEGER
LANGUAGE
	SQL STABLE
AS $$
	SELECT cast(extract(epoch FROM now()) AS INTEGER);
$$;

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE TABLE IF NOT EXISTS details (

	details_id  UUID NOT NULL DEFAULT gen_random_uuid(),

	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	nick_name VARCHAR(255),
	gender details_gender NOT NULL,
	mobile_phone_number VARCHAR(14) NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT details_pk
		PRIMARY KEY (details_id),

	CONSTRAINT details_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

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

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

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

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE TABLE IF NOT EXISTS location (

	location_id UUID NOT NULL DEFAULT gen_random_uuid(),

	name VARCHAR(255) NOT NULL,
	plus_code VARCHAR(15) NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT location_pk
		PRIMARY KEY (location_id),

	CONSTRAINT location_unique_name
		UNIQUE (name),

	CONSTRAINT location_unique_plus_code
		UNIQUE (plus_code),

	CONSTRAINT location_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE TABLE IF NOT EXISTS course (

	course_id UUID NOT NULL DEFAULT gen_random_uuid(),

	name VARCHAR(255) NOT NULL,
	description VARCHAR(1024) NOT NULL,
	photo VARCHAR(1024) NOT NULL,
	default_price SMALLINT,
	default_duration SMALLINT NOT NULL,
	default_capacity SMALLINT NOT NULL,
	default_equipment_available SMALLINT NOT NULL,
	default_location_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT course_pk
		PRIMARY KEY (course_id),

	CONSTRAINT course_check_default_price
		CHECK (default_price > 0),

	CONSTRAINT course_check_default_duration
		CHECK (default_duration > 0 AND default_duration <= 60 * 60 * 4),

	CONSTRAINT course_check_default_capacity
		CHECK (default_capacity > 0),

	CONSTRAINT course_check_default_equipment_available
		CHECK (default_equipment_available >= 0),

	CONSTRAINT course_check_default_capacity_and_equipment_available
		CHECK (default_capacity < default_equipment_available),

	CONSTRAINT course_fk_default_location_id
		FOREIGN KEY (default_location_id)
		REFERENCES location (location_id),

	CONSTRAINT course_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

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
		ON UPDATE CASCADE
		ON DELETE CASCADE,

	CONSTRAINT course_default_instructor_fk_instructor_id
		FOREIGN KEY (instructor_id)
		REFERENCES instructor (instructor_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,

	CONSTRAINT course_default_instructor_check_index
		CHECK (index >= 0),

	CONSTRAINT course_default_instructor_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE TABLE IF NOT EXISTS session (

	session_id UUID NOT NULL DEFAULT gen_random_uuid(),

	title VARCHAR(255) NOT NULL,
	notes VARCHAR(1024) NOT NULL,
	price SMALLINT,
	start_time INTEGER NOT NULL,
	end_time INTEGER NOT NULL,
	capacity SMALLINT NOT NULL,
	equipment_available SMALLINT NOT NULL,
	course_id UUID NOT NULL,
	location_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT session_pk
		PRIMARY KEY (session_id),

	CONSTRAINT course_fk_location_id
		FOREIGN KEY (location_id)
		REFERENCES location (location_id),

	CONSTRAINT session_check_price
		CHECK (price > 0),

	CONSTRAINT session_check_start_time
		CHECK (start_time > get_now()),

	CONSTRAINT session_check_end_time
		CHECK (end_time > start_time),

	-- check duration is less than 4 hours
	CONSTRAINT session_check_duration
		CHECK (end_time - start_time <= 60 * 60 * 4),

	CONSTRAINT session_check_equipment_available
		CHECK (equipment_available >= 0),

	CONSTRAINT session_check_capacity
		CHECK (capacity > 0),

	CONSTRAINT session_fk_course_id
		FOREIGN KEY (course_id)
		REFERENCES course (course_id),

	CONSTRAINT session_fk_location_id
		FOREIGN KEY (location_id)
		REFERENCES location (location_id),

	CONSTRAINT session_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE TABLE IF NOT EXISTS session_instructor (

	course_id UUID NOT NULL,
	index SMALLINT NOT NULL,

	instructor_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT session_instructor_pk
		PRIMARY KEY (course_id, index),

	CONSTRAINT session_instructor_fk_course_id
		FOREIGN KEY (course_id)
		REFERENCES course (course_id),

	CONSTRAINT session_instructor_fk_instructor_id
		FOREIGN KEY (instructor_id)
		REFERENCES instructor (instructor_id),

	CONSTRAINT session_instructor_check_index
		CHECK (index >= 0),

	CONSTRAINT session_instructor_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

CREATE TABLE IF NOT EXISTS booking (

	booking_id UUID NOT NULL DEFAULT gen_random_uuid(),

	notes VARCHAR(1024) NOT NULL,
	is_bringing_own_equipment BOOLEAN NOT NULL,
	session_id UUID NOT NULL,
	student_id VARCHAR(255) NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT booking_pk
		PRIMARY KEY (booking_id),

	CONSTRAINT booking_fk_session_id
		FOREIGN KEY (session_id)
		REFERENCES session (session_id),

	CONSTRAINT booking_check_created_at
		CHECK (created_at <= get_now())
);

-- ############################################################################################## --
-- ############################################################################################## --
-- ############################################################################################## --

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
		REFERENCES course (course_id),

	CONSTRAINT review_fk_student_id
		FOREIGN KEY (student_id)
		REFERENCES student (student_id),

	CONSTRAINT review_check_score
		CHECK (score >= 1 AND score <= 5),

	CONSTRAINT review_check_created_at
		CHECK (created_at <= get_now())
);