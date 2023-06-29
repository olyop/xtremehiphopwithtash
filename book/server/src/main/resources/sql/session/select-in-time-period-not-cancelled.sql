SELECT
	%s
FROM
	session
WHERE
	start_time < :endTime AND
	end_time > :startTime AND
	is_cancelled = FALSE
ORDER BY
	start_time ASC;