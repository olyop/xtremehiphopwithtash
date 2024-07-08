SELECT
	has_signed_waiver
FROM
	student
WHERE
	student_id = :studentID;