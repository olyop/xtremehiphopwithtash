package com.xtremehiphopwithtash.book.service.database.course;

import com.xtremehiphopwithtash.book.graphql.input.CourseInput;
import com.xtremehiphopwithtash.book.service.database.course.defaultinstructor.CourseDefaultInstructor;
import com.xtremehiphopwithtash.book.service.database.course.defaultinstructor.CourseDefaultInstructorDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityServiceInter;
import com.xtremehiphopwithtash.book.service.validator.CourseValidator;
import com.xtremehiphopwithtash.book.service.validator.LocationValidator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class CourseService implements EntityServiceInter<Course, CourseInput, UUID> {

	private final CourseDAO courseDAO;
	private final CourseDefaultInstructorDAO courseDefaultInstructorDAO;
	private final CourseValidator validator;
	private final LocationValidator locationValidator;
	private final CourseInputMapper inputMapper;

	public CourseService(
		CourseDAO courseDAO,
		CourseDefaultInstructorDAO courseDefaultInstructorDAO,
		CourseValidator validator,
		LocationValidator locationValidator,
		CourseInputMapper inputMapper
	) {
		this.courseDAO = courseDAO;
		this.courseDefaultInstructorDAO = courseDefaultInstructorDAO;
		this.validator = validator;
		this.locationValidator = locationValidator;
		this.inputMapper = inputMapper;
	}

	@Override
	public List<Course> retreiveAll() {
		return courseDAO.select();
	}

	@Override
	public Course retreiveByID(UUID courseID) {
		validator.validateID(courseID);

		return courseDAO.selectByID(courseID);
	}

	@Override
	public Course create(CourseInput input) {
		validator.validateCreate(input);

		Course course = inputMapper.map(input);
		Course createdCourse = courseDAO.insert(course);

		handleDefaultInstructors(input.defaultInstructorIDs(), createdCourse.getCourseID());

		return createdCourse;
	}

	@Override
	public Course updateByID(UUID courseID, CourseInput input) {
		validator.validateUpdate(courseID, input);

		Course course = inputMapper.map(input);
		Course updatedCourse = courseDAO.updateByID(courseID, course);

		handleDefaultInstructors(input.defaultInstructorIDs(), courseID);

		return updatedCourse;
	}

	@Override
	public UUID deleteByID(UUID courseID) {
		validator.validateDelete(courseID);

		courseDefaultInstructorDAO.deleteByCourseID(courseID);
		courseDAO.deleteByID(courseID);

		return courseID;
	}

	@Override
	public boolean existsByID(UUID courseID) {
		return courseDAO.existsByID(courseID);
	}

	public boolean existsByName(String name) {
		return courseDAO.existsByName(name);
	}

	public List<Course> retreiveByLocationID(UUID locationID) {
		locationValidator.validateID(locationID);

		return courseDAO.selectByLocationID(locationID);
	}

	public List<Course> retreiveByInstructorID(UUID instructorID) {
		validator.validateID(instructorID);

		return courseDAO.selectByInstructorID(instructorID);
	}

	private void handleDefaultInstructors(List<UUID> defaultInstructorsIDs, UUID courseID) {
		courseDefaultInstructorDAO.deleteByCourseID(courseID);

		Short index = 0;

		for (UUID instructorID : defaultInstructorsIDs) {
			CourseDefaultInstructor courseDefaultInstructor = new CourseDefaultInstructor();

			courseDefaultInstructor.setCourseID(courseID);
			courseDefaultInstructor.setIndex(index++);
			courseDefaultInstructor.setInstructorID(instructorID);

			courseDefaultInstructorDAO.insert(courseDefaultInstructor);
		}
	}
}
