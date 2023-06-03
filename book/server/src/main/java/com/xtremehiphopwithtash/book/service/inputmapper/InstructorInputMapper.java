package com.xtremehiphopwithtash.book.service.inputmapper;

import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
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
