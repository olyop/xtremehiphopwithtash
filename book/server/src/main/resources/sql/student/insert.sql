INSERT INTO student
	(student_id, details_id, stripe_customer_id)
VALUES
	(:studentID, :detailsID, :stripeCustomerID)
RETURNING
	%s;