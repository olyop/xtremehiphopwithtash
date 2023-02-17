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
import com.xtremehiphopwithtash.book.resolver.validator.CourseValidator;
import java.net.URL;
import java.util.ArrayList;
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

	private final CourseDAO courseDAO;
	private final CourseDefaultInstructorDAO courseDefaultInstructorDAO;
	private final LocationDAO locationDAO;
	private final InstructorDAO instructorDAO;
	private final CourseValidator courseValidator;

	public CourseResolver(
		CourseDAO courseDAO,
		CourseDefaultInstructorDAO courseDefaultInstructorDAO,
		LocationDAO locationDAO,
		InstructorDAO instructorDAO,
		CourseValidator courseValidator
	) {
		this.courseDAO = courseDAO;
		this.courseDefaultInstructorDAO = courseDefaultInstructorDAO;
		this.locationDAO = locationDAO;
		this.instructorDAO = instructorDAO;
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
		List<CourseDefaultInstructor> defaultInstructors = courseDefaultInstructorDAO.selectByCourseID(
			course.getCourseID()
		);

		List<Instructor> instructors = new ArrayList<>();
		for (CourseDefaultInstructor defaultInstructor : defaultInstructors) {
			instructors.add(instructorDAO.selectByID(defaultInstructor.getInstructorID()).get());
		}

		return instructors;
	}

	@MutationMapping
	public Course createCourse(@Argument CourseInput input) {
		String name = input.getName();
		String description = input.getDescription();
		URL photo = input.getPhoto();
		Optional<Short> defaultPrice = input.getDefaultPrice();
		Short defaultDuration = input.getDefaultDuration();
		Short defaultCapacity = input.getDefaultCapacity();
		Short defaultEquipmentAvailable = input.getDefaultEquipmentAvailable();
		UUID defaultLocationID = input.getDefaultLocationID();
		List<UUID> defaultInstructorIDs = input.getDefaultInstructorIDs();

		courseValidator.validateInput(input);

		Course course = new Course();
		course.setName(name);
		course.setDescription(description);
		course.setPhoto(photo);
		course.setDefaultPrice(defaultPrice.get());
		course.setDefaultDuration(defaultDuration);
		course.setDefaultCapacity(defaultCapacity);
		course.setDefaultEquipmentAvailable(defaultEquipmentAvailable);
		course.setDefaultLocationID(defaultLocationID);

		Course courseSaved = courseDAO.insert(course);

		Short index = 0;
		for (UUID instructorID : defaultInstructorIDs) {
			CourseDefaultInstructor courseDefaultInstructor = new CourseDefaultInstructor();
			courseDefaultInstructor.setCourseID(courseSaved.getCourseID());
			courseDefaultInstructor.setIndex(index++);
			courseDefaultInstructor.setInstructorID(instructorID);

			courseDefaultInstructorDAO.insert(courseDefaultInstructor);
		}

		return courseSaved;
	}

	@MutationMapping
	public Course updateCourse(@Argument UUID courseID, @Argument CourseInput input) {
		String name = input.getName();
		String description = input.getDescription();
		URL photo = input.getPhoto();
		Optional<Short> defaultPrice = input.getDefaultPrice();
		Short defaultDuration = input.getDefaultDuration();
		Short defaultCapacity = input.getDefaultCapacity();
		Short defaultEquipmentAvailable = input.getDefaultEquipmentAvailable();
		UUID defaultLocationID = input.getDefaultLocationID();
		List<UUID> defaultInstructorIDs = input.getDefaultInstructorIDs();

		courseValidator.validateID(courseID);
		courseValidator.validateInput(input);

		Course course = new Course();
		course.setName(name);
		course.setDescription(description);
		course.setPhoto(photo);
		course.setDefaultPrice(defaultPrice.get());
		course.setDefaultDuration(defaultDuration);
		course.setDefaultCapacity(defaultCapacity);
		course.setDefaultEquipmentAvailable(defaultEquipmentAvailable);
		course.setDefaultLocationID(defaultLocationID);

		Course courseSaved = courseDAO.updateByID(courseID, course);

		courseDefaultInstructorDAO.deleteByCourseID(courseID);

		Short index = 0;
		for (UUID instructorID : defaultInstructorIDs) {
			CourseDefaultInstructor courseDefaultInstructor = new CourseDefaultInstructor();
			courseDefaultInstructor.setCourseID(courseSaved.getCourseID());
			courseDefaultInstructor.setIndex(index++);
			courseDefaultInstructor.setInstructorID(instructorID);

			courseDefaultInstructorDAO.insert(courseDefaultInstructor);
		}

		return courseSaved;
	}

	@MutationMapping
	public UUID deleteCourse(@Argument UUID courseID) {
		courseValidator.validateID(courseID);

		List<CourseDefaultInstructor> defaultInstructors = courseDefaultInstructorDAO.selectByCourseID(
			courseID
		);

		for (CourseDefaultInstructor defaultInstructor : defaultInstructors) {
			courseDefaultInstructorDAO.deleteByID(courseID, defaultInstructor.getIndex());
		}

		courseDAO.deleteByID(courseID);

		return courseID;
	}
}
