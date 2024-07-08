UPDATE
	student
SET
	has_signed_waiver = TRUE
WHERE
	student_id = :studentID;