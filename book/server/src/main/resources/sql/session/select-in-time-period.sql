SELECT
	%s
FROM
	session
WHERE
	start_time < :endTime AND
	end_time > :startTime
ORDER BY
	start_time ASC;