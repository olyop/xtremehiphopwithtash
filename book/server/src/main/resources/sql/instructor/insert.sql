INSERT INTO instructor
	(details_id, photo)
VALUES
	(:detailsID, :photo)
RETURNING
	%s;