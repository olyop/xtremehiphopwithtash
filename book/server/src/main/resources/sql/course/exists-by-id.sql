SELECT EXISTS (
	SELECT
		1
	FROM
		course
	WHERE
		course_id = :courseID
);