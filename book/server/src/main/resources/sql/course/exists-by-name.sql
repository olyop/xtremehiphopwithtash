SELECT EXISTS (
	SELECT
		1
	FROM
		course
	WHERE
		name = :name
);