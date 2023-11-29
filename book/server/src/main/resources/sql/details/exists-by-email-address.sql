SELECT
	EXISTS (
		SELECT
			1
		FROM
			details
		WHERE
			email_address = :emailAddress
	);
