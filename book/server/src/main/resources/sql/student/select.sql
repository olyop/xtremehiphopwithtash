SELECT
	%s
FROM
	student
JOIN
	booking
		ON booking.student_id = student.student_id
GROUP BY
	student.student_id
ORDER BY
	count(booking.student_id) DESC;