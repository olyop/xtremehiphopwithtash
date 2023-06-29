SELECT EXISTS (
	SELECT
		1
	FROM
		booking
	WHERE
		student_id = :studentID AND
		session_id = :sessionID AND
		(payment_method = 'CASH' OR payment_method IS NULL)
);