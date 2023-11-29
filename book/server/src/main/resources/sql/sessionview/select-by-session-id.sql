SELECT
	%s
FROM
	session_view
WHERE
	session_id = :sessionID
ORDER BY
	created_at DESC;