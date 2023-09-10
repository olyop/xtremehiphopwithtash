SELECT
	%s
FROM
	course_default_instructor
WHERE
	course_id = :courseID AND
	index = :index;