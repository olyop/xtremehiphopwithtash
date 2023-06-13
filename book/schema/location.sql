CREATE TABLE IF NOT EXISTS location (

	location_id UUID NOT NULL DEFAULT gen_random_uuid(),

	name VARCHAR(255) NOT NULL,
	plus_code VARCHAR(15) NOT NULL,
	address VARCHAR(1024) NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT location_pk
		PRIMARY KEY (location_id),

	CONSTRAINT location_unique_name
		UNIQUE (name),

	CONSTRAINT location_unique_plus_code
		UNIQUE (plus_code),

	CONSTRAINT location_unique_address
		UNIQUE (address),

	CONSTRAINT location_check_created_at
		CHECK (created_at <= get_now())
);