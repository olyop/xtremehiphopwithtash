UPDATE
	location
SET
	name = :name,
	plus_code = :plusCode,
	address = :address
WHERE
	location_id = :locationID
RETURNING
	%s;