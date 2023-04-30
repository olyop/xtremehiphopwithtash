package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.CourseDAO;
import com.xtremehiphopwithtash.book.dao.CourseDefaultInstructorDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.dao.LocationDAO;
import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.CourseDefaultInstructor;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.resolver.input.CourseInput;
import com.xtremehiphopwithtash.book.resolver.mapper.CourseInputMapper;
import com.xtremehiphopwithtash.book.resolver.validator.CourseValidator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CourseResolver {

	private final CourseInputMapper courseInputMapper;
	private final CourseDAO courseDAO;
	private final CourseDefaultInstructorDAO courseDefaultInstructorDAO;
	private final LocationDAO locationDAO;
	private final InstructorDAO instructorDAO;
	private final CourseValidator courseValidator;

	public CourseResolver(
		CourseInputMapper courseInputMapper,
		CourseDAO courseDAO,
		LocationDAO locationDAO,
		InstructorDAO instructorDAO,
		CourseDefaultInstructorDAO courseDefaultInstructorDAO,
		CourseValidator courseValidator
	) {
		this.courseInputMapper = courseInputMapper;
		this.courseDAO = courseDAO;
		this.locationDAO = locationDAO;
		this.instructorDAO = instructorDAO;
		this.courseDefaultInstructorDAO = courseDefaultInstructorDAO;
		this.courseValidator = courseValidator;
	}

	@QueryMapping
	public List<Course> getCourses() {
		return courseDAO.select();
	}

	@QueryMapping
	public Optional<Course> getCourseByID(@Argument UUID courseID) {
		return courseDAO.selectByID(courseID);
	}

	@SchemaMapping(typeName = "Course", field = "defaultLocation")
	public Location getDefaultLocation(Course course) {
		return locationDAO.selectByID(course.getDefaultLocationID()).get();
	}

	@SchemaMapping(typeName = "Course", field = "defaultInstructors")
	public List<Instructor> getDefaultInstructors(Course course) {
		return instructorDAO.selectCourseDefaultInstructors(course.getCourseID());
	}

	@MutationMapping
	public Course createCourse(@Argument CourseInput input) {
		courseValidator.validateCreate(input);

		Course course = courseInputMapper.map(input);

		Course createdCourse = courseDAO.insert(course);

		handleDefaultInstructors(input.defaultInstructorIDs(), createdCourse.getCourseID());

		return createdCourse;
	}

	@MutationMapping
	public Course updateCourseByID(@Argument UUID courseID, @Argument CourseInput input) {
		courseValidator.validateUpdate(courseID, input);

		Course course = courseInputMapper.map(input);

		Course updateCourse = courseDAO.updateByID(courseID, course);

		handleDefaultInstructors(input.defaultInstructorIDs(), courseID);

		return updateCourse;
	}

	@MutationMapping
	public UUID deleteCourseByID(@Argument UUID courseID) {
		courseValidator.validateDelete(courseID);

		courseDefaultInstructorDAO.deleteByCourseID(courseID);
		courseDAO.deleteByID(courseID);

		return courseID;
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
