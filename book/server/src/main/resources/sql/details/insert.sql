INSERT INTO details
	(first_name, last_name, nick_name, gender, mobile_phone_number, email_address, instagram_username)
VALUES
	(:firstName, :lastName, :nickName, :gender::details_gender, :mobilePhoneNumber, :emailAddress, :instagramUsername)
RETURNING
	%s;