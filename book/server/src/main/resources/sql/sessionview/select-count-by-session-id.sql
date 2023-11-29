SELECT
	count(*) AS count
FROM
	session_view
WHERE
	session_id = :sessionID;