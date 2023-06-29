INSERT INTO session (
	title,
	notes,
	price,
	equipment_fee,
	start_time,
	end_time,
	capacity_available,
	equipment_available,
	course_id,
	location_id
) VALUES (
	:title,
	:notes,
	:price,
	:equipmentFee,
	:startTime,
	:endTime,
	:capacityAvailable,
	:equipmentAvailable,
	:courseID,
	:locationID
) RETURNING
	%s;