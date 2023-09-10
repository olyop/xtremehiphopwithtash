CREATE TABLE IF NOT EXISTS image_cache (

	image_cache_id UUID NOT NULL DEFAULT gen_random_uuid(),

	data BYTEA NOT NULL,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT image_cache_pk
		PRIMARY KEY (image_cache_id),

	CONSTRAINT image_cache_check_created_at
		CHECK (created_at <= get_now())
);