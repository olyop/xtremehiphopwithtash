SELECT
	%s
FROM
	session
WHERE
	start_time < :endTime AND
	end_time > :startTime AND
	session_id != :sessionID
ORDER BY
	start_time ASC;