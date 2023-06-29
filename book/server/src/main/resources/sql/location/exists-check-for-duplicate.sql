SELECT EXISTS (
	SELECT
		1
	FROM
		location
	WHERE
		name = :name OR
		plus_code = :plusCode OR
		address = :address
);