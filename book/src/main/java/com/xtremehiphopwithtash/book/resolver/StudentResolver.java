package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.StudentDAO;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.DetailsInput;
import java.util.List;
import java.util.Optional;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class StudentResolver {

	private final StudentDAO studentDAO;
	private final DetailsDAO detailsDAO;

	public StudentResolver(StudentDAO studentDAO, DetailsDAO detailsDAO) {
		this.studentDAO = studentDAO;
		this.detailsDAO = detailsDAO;
	}

	@QueryMapping
	public List<Student> getStudents() {
		return studentDAO.select();
	}

	@QueryMapping
	public Optional<Student> getStudentByID(@Argument String studentID) {
		return studentDAO.selectByID(studentID);
	}

	@SchemaMapping(typeName = "Student", field = "details")
	public Optional<Details> getStudentDetails(Student student) {
		return detailsDAO.selectByID(student.getDetailsID());
	}

	@MutationMapping
	public Student createStudent(@Argument String studentID, @Argument DetailsInput input) {
		String firstName = input.getFirstName();
		String lastName = input.getLastName();
		Optional<String> nickName = input.getNickName();
		String gender = input.getGender();
		String mobilePhoneNumber = input.getMobilePhoneNumber();

		if (studentDAO.existsByID(studentID)) {
			throw new IllegalArgumentException("Student already exists");
		}

		if (!detailsDAO.selectGenders().contains(gender)) {
			throw new IllegalArgumentException("Gender does not exist");
		}

		if (!mobilePhoneNumber.startsWith("04")) {
			throw new IllegalArgumentException("Please provide a valid mobile phone number");
		}

		Details details = new Details();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName.get());
		details.setGender(gender);
		details.setMobilePhoneNumber(mobilePhoneNumber);

		Details savedDetails = detailsDAO.insert(details);

		Student student = new Student();
		student.setStudentID(studentID);
		student.setDetailsID(savedDetails.getDetailsID());

		return studentDAO.insert(student);
	}

	@MutationMapping
	public Student updateStudent(@Argument String studentID, @Argument DetailsInput input) {
		String firstName = input.getFirstName();
		String lastName = input.getLastName();
		Optional<String> nickName = input.getNickName();
		String gender = input.getGender();
		String mobilePhoneNumber = input.getMobilePhoneNumber();

		if (!detailsDAO.selectGenders().contains(gender)) {
			throw new IllegalArgumentException("Gender does not exist");
		}

		if (!mobilePhoneNumber.startsWith("04")) {
			throw new IllegalArgumentException("Please provide a valid mobile phone number");
		}

		Optional<Student> student = studentDAO.selectByID(studentID);

		if (student.isEmpty()) {
			throw new IllegalArgumentException("Student does not exist");
		}

		Details details = detailsDAO.selectByID(student.get().getDetailsID()).get();
		details.setFirstName(firstName);
		details.setLastName(lastName);
		details.setNickName(nickName.get());
		details.setGender(gender);
		details.setMobilePhoneNumber(mobilePhoneNumber);

		detailsDAO.updateByID(student.get().getDetailsID(), details);

		return student.get();
	}
}
