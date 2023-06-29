UPDATE
	course
SET
	name = :name,
	description = :description,
	photo = :photo,
	default_price = :defaultPrice,
	default_equipment_fee = :defaultEquipmentFee,
	default_duration = :defaultDuration,
	default_capacity_available = :defaultCapacityAvailable,
	default_equipment_available = :defaultEquipmentAvailable,
	default_location_id = :defaultLocationID
WHERE
	course_id = :courseID
RETURNING
	%s;