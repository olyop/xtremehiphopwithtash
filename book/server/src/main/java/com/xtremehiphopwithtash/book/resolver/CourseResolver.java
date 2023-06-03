package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.model.Instructor;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.resolver.input.CourseInput;
import com.xtremehiphopwithtash.book.service.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.CourseService;
import com.xtremehiphopwithtash.book.service.InstructorService;
import com.xtremehiphopwithtash.book.service.LocationService;
import com.xtremehiphopwithtash.book.util.CurrencyUtil;
import java.util.List;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class CourseResolver {

	private final CourseService courseService;
	private final LocationService locationService;
	private final InstructorService instructorService;
	private final Auth0JwtService auth0JwtService;
	private final CurrencyUtil currencyUtil;

	public CourseResolver(
		CourseService courseService,
		LocationService locationService,
		InstructorService instructorService,
		Auth0JwtService auth0JwtService,
		CurrencyUtil currencyUtil
	) {
		this.courseService = courseService;
		this.locationService = locationService;
		this.instructorService = instructorService;
		this.auth0JwtService = auth0JwtService;
		this.currencyUtil = currencyUtil;
	}

	@QueryMapping
	public List<Course> getCourses(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		List<Course> courses = courseService.retreiveAll();

		return courses.isEmpty() ? null : courses;
	}

	@QueryMapping
	public Course getCourseByID(@Argument UUID courseID) {
		return courseService.retreiveByID(courseID);
	}

	@SchemaMapping(typeName = "Course", field = "defaultPrice")
	public Short getDefaultPrice(Course course) {
		return currencyUtil.centsToDollars(course.getDefaultPrice());
	}

	@SchemaMapping(typeName = "Course", field = "defaultEquipmentFee")
	public Short getDefaultEquipmentFee(Course course) {
		return currencyUtil.centsToDollars(course.getDefaultEquipmentFee());
	}

	@SchemaMapping(typeName = "Course", field = "defaultLocation")
	public Location getDefaultLocation(Course course) {
		return locationService.retreiveByID(course.getDefaultLocationID());
	}

	@SchemaMapping(typeName = "Course", field = "defaultInstructors")
	public List<Instructor> getDefaultInstructors(Course course) {
		return instructorService.retreiveCourseDefaultInstructors(course.getCourseID());
	}

	@MutationMapping
	public Course createCourse(@Argument CourseInput input, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return courseService.create(input);
	}

	@MutationMapping
	public Course updateCourseByID(
		@Argument UUID courseID,
		@Argument CourseInput input,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		return courseService.updateByID(courseID, input);
	}

	@MutationMapping
	public UUID deleteCourseByID(@Argument UUID courseID, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return courseService.deleteByID(courseID);
	}
}
