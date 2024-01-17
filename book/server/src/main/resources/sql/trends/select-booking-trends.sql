SELECT
	COUNT(created_at_day) AS bookings,
	(created_at_day * 86400) AS unix_day
FROM
	(
		SELECT
			(created_at / 86400) AS created_at_day
		FROM
			booking
		WHERE
			created_at > :startTime AND
			created_at < :endTime
	)
GROUP BY
	created_at_day
ORDER BY
	unix_day DESC