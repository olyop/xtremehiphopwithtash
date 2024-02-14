SELECT
	coalesce(
		(
			SELECT
				created_at
			FROM
				booking
			WHERE
				student_id = :studentID
			ORDER BY
				created_at DESC
			LIMIT
				1
		),
		0
	);