SELECT EXISTS (
	SELECT
		1
	FROM
		student
	WHERE
		student_id = :studentID
);