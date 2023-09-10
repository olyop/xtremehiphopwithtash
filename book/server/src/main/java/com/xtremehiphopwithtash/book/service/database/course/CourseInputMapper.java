package com.xtremehiphopwithtash.book.service.database.course;

import com.xtremehiphopwithtash.book.graphql.input.CourseInput;
import com.xtremehiphopwithtash.book.service.helpers.CommonTransform;
import com.xtremehiphopwithtash.book.service.helpers.InputMapper;
import org.springframework.stereotype.Component;

@Component
public class CourseInputMapper implements InputMapper<CourseInput, Course> {

	@Override
	public Course map(CourseInput input) {
		Course c = new Course();

		c.setName(CommonTransform.transformText(input.name()));
		c.setDescription(CommonTransform.transformText(input.description()));
		c.setPhoto(input.photo());
		c.setDefaultPrice(input.defaultPrice().orElse(null));
		c.setDefaultEquipmentFee(input.defaultEquipmentFee().orElse(null));
		c.setDefaultDuration(input.defaultDuration());
		c.setDefaultCapacityAvailable(input.defaultCapacityAvailable());
		c.setDefaultEquipmentAvailable(input.defaultEquipmentAvailable().orElse(null));
		c.setDefaultLocationID(input.defaultLocationID());

		return c;
	}
}
