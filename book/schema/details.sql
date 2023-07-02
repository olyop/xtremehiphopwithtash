CREATE TABLE IF NOT EXISTS details (

	details_id  UUID NOT NULL DEFAULT gen_random_uuid(),

	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	nick_name VARCHAR(255),
	gender details_gender,
	mobile_phone_number VARCHAR(14) NOT NULL,
	email_address VARCHAR(255),
	instagram_username VARCHAR(30),

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT details_pk
		PRIMARY KEY (details_id),

	CONSTRAINT instagram_username_regex
		CHECK (instagram_username ~ '^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$'),

	CONSTRAINT details_check_created_at
		CHECK (created_at <= get_now())
);