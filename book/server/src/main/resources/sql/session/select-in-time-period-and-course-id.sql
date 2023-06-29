SELECT
	%s
FROM
	session
WHERE
	start_time < :endTime AND
	end_time > :startTime AND
	course_id = :courseID
ORDER BY
	start_time ASC;