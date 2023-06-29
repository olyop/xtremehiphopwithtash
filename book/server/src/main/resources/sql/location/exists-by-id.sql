SELECT EXISTS (
	SELECT
		1
	FROM
		location
	WHERE
		location_id = :locationID
);