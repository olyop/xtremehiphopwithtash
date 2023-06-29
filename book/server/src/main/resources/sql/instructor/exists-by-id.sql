SELECT EXISTS (
	SELECT
		1
	FROM
		instructor
	WHERE
		instructor_id = :instructorID
);