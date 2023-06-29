SELECT EXISTS (
	SELECT
		1
	FROM
		coupon
	WHERE
		code = :code
);