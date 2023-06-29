SELECT
	%s
FROM
	instructor
JOIN
	course_default_instructor
ON
	instructor.instructor_id = course_default_instructor.instructor_id
WHERE
	course_default_instructor.course_id = :courseID;