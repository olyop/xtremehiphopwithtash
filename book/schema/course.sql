CREATE TABLE IF NOT EXISTS course (

	course_id UUID NOT NULL DEFAULT gen_random_uuid(),

	name VARCHAR(255) NOT NULL,
	description VARCHAR(1024) NOT NULL,
	photo VARCHAR(1024) NOT NULL,
	default_price SMALLINT,
	default_equipment_fee SMALLINT,
	default_duration SMALLINT NOT NULL,
	default_capacity_available SMALLINT NOT NULL,
	default_equipment_available SMALLINT,
	default_location_id UUID NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT course_pk
		PRIMARY KEY (course_id),

	CONSTRAINT course_check_default_price
		CHECK (default_price > 0),

	CONSTRAINT course_check_default_equipment_fee
		CHECK (default_equipment_fee > 0),

	CONSTRAINT course_check_default_duration
		CHECK (default_duration > 0 AND default_duration <= 60 * 60 * 4),

	CONSTRAINT course_check_default_capacity_available
		CHECK (default_capacity_available > 0),

	CONSTRAINT course_check_default_equipment_available
		CHECK (default_equipment_available >= 0),

	CONSTRAINT course_check_default_capacity_and_equipment_available
		CHECK (default_capacity_available >= default_equipment_available),

	CONSTRAINT course_fk_default_location_id
		FOREIGN KEY (default_location_id)
		REFERENCES location (location_id)
		ON UPDATE CASCADE,

	CONSTRAINT course_check_created_at
		CHECK (created_at <= get_now())
);