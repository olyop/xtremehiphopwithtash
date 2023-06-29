INSERT INTO coupon
	(code, discount)
VALUES
	(:code, :discount)
RETURNING
	%s;