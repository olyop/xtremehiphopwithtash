UPDATE
	details
SET
	first_name = :firstName,
	last_name = :lastName,
	nick_name = :nickName,
	gender = :gender::details_gender,
	mobile_phone_number = :mobilePhoneNumber,
	email_address = :emailAddress,
	instagram_username = :instagramUsername
WHERE
	details_id = :detailsID
RETURNING
	%s;