package com.xtremehiphopwithtash.book.service.inputmapper;

import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.resolver.input.CourseInput;
import org.springframework.stereotype.Component;

@Component
public class CourseInputMapper implements InputMapper<CourseInput, Course> {

	@Override
	public Course map(CourseInput input) {
		Course course = new Course();

		course.setName(CommonTransform.transformText(input.name()));
		course.setDescription(CommonTransform.transformText(input.description()));
		course.setPhoto(input.photo());
		course.setDefaultPrice(input.defaultPrice().orElse(null));
		course.setDefaultEquipmentFee(input.defaultEquipmentFee().orElse(null));
		course.setDefaultDuration(input.defaultDuration());
		course.setDefaultCapacityAvailable(input.defaultCapacityAvailable());
		course.setDefaultEquipmentAvailable(input.defaultEquipmentAvailable().orElse(null));
		course.setDefaultLocationID(input.defaultLocationID());

		return course;
	}
}
