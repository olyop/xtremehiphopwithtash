package com.xtremehiphopwithtash.book.service.inputmapper;

import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.resolver.input.CourseInput;
import com.xtremehiphopwithtash.book.service.inputmapper.transform.CommonTransform;
import com.xtremehiphopwithtash.book.util.CurrencyUtil;
import org.springframework.stereotype.Component;

@Component
public class CourseInputMapper implements InputMapper<CourseInput, Course> {

	private final CurrencyUtil currencyUtil;

	public CourseInputMapper(CurrencyUtil currencyUtil) {
		this.currencyUtil = currencyUtil;
	}

	@Override
	public Course map(CourseInput input) {
		Course course = new Course();

		course.setName(CommonTransform.transformText(input.name()));
		course.setDescription(CommonTransform.transformText(input.description()));
		course.setPhoto(input.photo());
		course.setDefaultPrice(currencyUtil.dollarsToCents(input.defaultPrice()));
		course.setDefaultEquipmentFee(currencyUtil.dollarsToCents(input.defaultEquipmentFee()));
		course.setDefaultDuration(input.defaultDuration());
		course.setDefaultCapacityAvailable(input.defaultCapacityAvailable());
		course.setDefaultEquipmentAvailable(input.defaultEquipmentAvailable().orElse(null));
		course.setDefaultLocationID(input.defaultLocationID());

		return course;
	}
}
