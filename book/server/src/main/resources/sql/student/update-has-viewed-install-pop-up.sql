UPDATE
	student
SET
	has_viewed_install_pop_up = TRUE
WHERE
	student_id = :studentID;