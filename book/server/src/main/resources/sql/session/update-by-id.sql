UPDATE
	session
SET
	title = :title,
	notes = :notes,
	price = :price,
	equipment_fee = :equipmentFee,
	start_time = :startTime,
	end_time = :endTime,
	capacity_available = :capacityAvailable,
	equipment_available = :equipmentAvailable,
	course_id = :courseID,
	location_id = :locationID
WHERE
	session_id = :sessionID
RETURNING
	%s;