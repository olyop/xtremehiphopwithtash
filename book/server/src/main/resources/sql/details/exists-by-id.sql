SELECT EXISTS (
	SELECT
		1
	FROM
		details
	WHERE
		details_id = :detailsID
);