CREATE TABLE IF NOT EXISTS coupon (

	coupon_id UUID NOT NULL DEFAULT gen_random_uuid(),

	code VARCHAR(9) NOT NULL,
	discount SMALLINT NOT NULL,
	used_at INTEGER,
	used_by_student_id VARCHAR(255),
	used_on_booking_id UUID,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT coupon_pk
		PRIMARY KEY (coupon_id),

	CONSTRAINT coupon_check_code
		CHECK (code ~ '^[A-Z0-9]{9}$'),

	CONSTRAINT coupon_check_code_unique
		UNIQUE (code),

	CONSTRAINT coupon_check_discount
		CHECK (discount > 0 AND discount <= 100),

	CONSTRAINT coupon_fk_used_by_student_id
		FOREIGN KEY (used_by_student_id)
		REFERENCES student (student_id)
		ON UPDATE CASCADE,

	CONSTRAINT coupon_fk_used_on_booking_id
		FOREIGN KEY (used_on_booking_id)
		REFERENCES booking (booking_id)
		ON UPDATE CASCADE,

	CONSTRAINT coupon_check_used_at
		CHECK (used_at >= created_at),

	CONSTRAINT coupon_check_columns
		CHECK (
			(used_at IS NULL AND used_by_student_id IS NULL AND used_on_booking_id IS NULL) OR
			(used_at IS NOT NULL AND used_by_student_id IS NOT NULL AND used_on_booking_id IS NOT NULL)
		),

	CONSTRAINT coupon_check_created_at
		CHECK (created_at <= get_now())
);