CREATE TABLE IF NOT EXISTS booking (

	booking_id UUID NOT NULL DEFAULT gen_random_uuid(),

	notes VARCHAR(1024),
	session_id UUID NOT NULL,
	student_id VARCHAR(255) NOT NULL,
	booking_quantity SMALLINT NOT NULL,
	equipment_quantity SMALLINT,
	payment_method booking_payment_method,
	cost INTEGER,
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
		CHECK (booking_quantity >= 1),

	CONSTRAINT booking_check_equipment_quantity
		CHECK (equipment_quantity >= 1),

	CONSTRAINT booking_check_quantities
		CHECK (booking_quantity >= equipment_quantity),

	CONSTRAINT booking_check_created_at
		CHECK (created_at <= get_now())
);