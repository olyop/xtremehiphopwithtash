INSERT INTO location
	(name, plus_code, address)
VALUES
	(:name, :plusCode, :address)
RETURNING
	%s;