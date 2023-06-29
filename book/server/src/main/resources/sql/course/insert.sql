INSERT INTO course (
	name,
	description,
	photo,
	default_price,
	default_equipment_fee,
	default_duration,
	default_capacity_available,
	default_equipment_available,
	default_location_id
) VALUES (
	:name,
	:description,
	:photo,
	:defaultPrice,
	:defaultEquipmentFee,
	:defaultDuration,
	:defaultCapacityAvailable,
	:defaultEquipmentAvailable,
	:defaultLocationID
) RETURNING
	%s;