UPDATE
	instructor
SET
	photo = :photo
WHERE
	instructor_id = :instructorID
RETURNING
	%s;