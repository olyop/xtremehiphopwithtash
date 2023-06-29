SELECT EXISTS (
	SELECT
		1
	FROM
		details
	WHERE
		first_name = :firstName AND
		last_name = :lastName AND
		nick_name = :nickName
);