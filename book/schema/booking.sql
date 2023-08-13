CREATE TABLE IF NOT EXISTS booking (

	booking_id UUID NOT NULL DEFAULT gen_random_uuid(),

	notes VARCHAR(1024),
	session_id UUID NOT NULL,
	student_id VARCHAR(255) NOT NULL,
	booking_quantity SMALLINT NOT NULL,
	equipment_quantity SMALLINT,
	payment_method booking_payment_method,
	payment_intent_id VARCHAR(255),
	cost INTEGER,
	has_checked_in BOOLEAN NOT NULL DEFAULT FALSE,
	has_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
	cancelled_at INTEGER,

	created_at INTEGER NOT NULL DEFAULT get_now(),

	CONSTRAINT booking_pk
		PRIMARY KEY (booking_id),

	CONSTRAINT booking_fk_session_id
		FOREIGN KEY (session_id)
		REFERENCES session (session_id)
		ON UPDATE CASCADE,

	CONSTRAINT booking_fk_student_id
		FOREIGN KEY (student_id)
		REFERENCES student (student_id)
		ON UPDATE CASCADE,

	CONSTRAINT booking_check_booking_quantity
		CHECK (booking_quantity >= 1 AND booking_quantity <= 5),

	CONSTRAINT booking_check_equipment_quantity
		CHECK (equipment_quantity >= 1 AND equipment_quantity <= 5),

	CONSTRAINT booking_check_quantities
		CHECK (booking_quantity >= equipment_quantity),

	CONSTRAINT booking_check_payment_intent_id
		CHECK (payment_intent_id LIKE 'pi_%'),

	CONSTRAINT booking_check_cost
		CHECK (cost >= 0),

	CONSTRAINT booking_check_cost_and_payment_method
		CHECK (
			(payment_method IS NULL AND cost IS NULL) OR
			(payment_method = 'COUPON'::booking_payment_method AND cost IS NULL) OR
			((payment_method = 'CARD'::booking_payment_method OR payment_method = 'CASH'::booking_payment_method) AND cost IS NOT NULL)
		),

	CONSTRAINT booking_check_has_cancelled_and_has_checked_in
		CHECK (
			(has_cancelled = FALSE AND has_checked_in = FALSE) OR
			(has_cancelled = TRUE AND has_checked_in = FALSE) OR
			(has_cancelled = FALSE AND has_checked_in = TRUE)
		),

	CONSTRAINT booking_check_cancelled_at
		CHECK (
			(cancelled_at IS NULL AND has_cancelled = FALSE) OR
			(cancelled_at IS NOT NULL AND has_cancelled = TRUE)
		)

	CONSTRAINT booking_check_created_at
		CHECK (created_at <= get_now())
);