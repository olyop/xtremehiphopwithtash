package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.resolver.input.InstructorInput;
import com.xtremehiphopwithtash.book.service.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.service.inputmapper.InstructorInputMapper;
import com.xtremehiphopwithtash.book.service.inter.EntityServiceInter;
import com.xtremehiphopwithtash.book.service.validator.InstructorValidator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class InstructorService implements EntityServiceInter<Instructor, InstructorInput, UUID> {

	private final InstructorDAO instructorDAO;
	private final DetailsService detailsService;
	private final InstructorValidator validator;
	private final InstructorInputMapper inputMapper;

	public InstructorService(
		InstructorDAO instructorDAO,
		DetailsService detailsService,
		InstructorValidator validator,
		InstructorInputMapper inputMapper
	) {
		this.instructorDAO = instructorDAO;
		this.detailsService = detailsService;
		this.validator = validator;
		this.inputMapper = inputMapper;
	}

	@Override
	public List<Instructor> retreiveAll() {
		return instructorDAO.select();
	}

	@Override
	public Instructor retreiveByID(UUID instructorID) {
		validator.validateID(instructorID);

		return instructorDAO.selectByID(instructorID);
	}

	@Override
	public Instructor create(InstructorInput input) {
		validator.validateCreate(input);

		Details details = detailsService.create(input.details());

		Instructor instructor = inputMapper.map(input);
		instructor.setDetailsID(details.getDetailsID());

		return instructorDAO.insert(instructor);
	}

	@Override
	public Instructor updateByID(UUID instructorID, InstructorInput input) {
		validator.validateUpdate(instructorID, input);

		Instructor currentInstructor = instructorDAO.selectByID(instructorID);

		detailsService.updateByID(currentInstructor.getDetailsID(), input.details());

		Instructor instructor = inputMapper.map(input);
		instructor.setPhoto(currentInstructor.getPhoto());

		Instructor savedInstructor = instructorDAO.updateByID(instructorID, instructor);

		return savedInstructor;
	}

	@Override
	public UUID cancelByID(UUID instructorID) {
		validator.validateCancel(instructorID);

		Instructor instructor = instructorDAO.selectByID(instructorID);

		detailsService.cancelByID(instructor.getDetailsID());
		instructorDAO.deleteByID(instructorID);

		return instructorID;
	}

	@Override
	public boolean existsByID(UUID instructorID) {
		return instructorDAO.existsByID(instructorID);
	}

	public List<Instructor> retreiveCourseDefaultInstructors(UUID courseID) {
		return instructorDAO.selectCourseDefaultInstructors(courseID);
	}

	public List<Instructor> retreiveSessionInstructors(UUID sessionID) {
		return instructorDAO.selectsSessionInstructors(sessionID);
	}
}
