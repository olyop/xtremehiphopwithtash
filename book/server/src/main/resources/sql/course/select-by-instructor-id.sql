SELECT
	%s
FROM
	course
JOIN
	course_default_instructor
		ON course.course_id = course_default_instructor.course_id
WHERE
	course_default_instructor.instructor_id = :instructorID;