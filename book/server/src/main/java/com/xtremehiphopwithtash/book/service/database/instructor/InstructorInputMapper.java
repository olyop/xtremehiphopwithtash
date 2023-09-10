package com.xtremehiphopwithtash.book.service.database.instructor;

import com.xtremehiphopwithtash.book.graphql.input.InstructorInput;
import com.xtremehiphopwithtash.book.service.helpers.InputMapper;
import org.springframework.stereotype.Component;

@Component
public class InstructorInputMapper implements InputMapper<InstructorInput, Instructor> {

	@Override
	public Instructor map(InstructorInput input) {
		Instructor instructor = new Instructor();

		instructor.setPhoto(input.photo());

		return instructor;
	}
}
