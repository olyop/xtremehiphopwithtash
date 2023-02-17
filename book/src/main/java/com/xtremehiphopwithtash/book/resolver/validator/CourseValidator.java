package com.xtremehiphopwithtash.book.resolver.validator;

import com.xtremehiphopwithtash.book.dao.CourseDAO;
import com.xtremehiphopwithtash.book.resolver.input.CourseInput;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class CourseValidator implements Validator<UUID, CourseInput> {

	private CourseDAO courseDAO;
	private CommonValidator commonValidator;
	private LocationValidtor locationValidtor;
	private InstructorValidator instructorValidator;

	public CourseValidator(
		CourseDAO courseDAO,
		CommonValidator commonValidator,
		LocationValidtor locationValidtor,
		InstructorValidator instructorValidator
	) {
		this.courseDAO = courseDAO;
		this.commonValidator = commonValidator;
		this.locationValidtor = locationValidtor;
		this.instructorValidator = instructorValidator;
	}

	@Override
	public void validateID(UUID id) {
		if (!courseDAO.existsByID(id)) {
			throw new ResolverException("Course does not exist");
		}
	}

	@Override
	public void validateInput(CourseInput input) {
		String name = input.getName();
		String description = input.getDescription();
		URL photo = input.getPhoto();
		Optional<Short> defaultPrice = input.getDefaultPrice();
		Short defaultDuration = input.getDefaultDuration();
		Short defaultCapacity = input.getDefaultCapacity();
		Short defaultEquipmentAvailable = input.getDefaultEquipmentAvailable();
		UUID defaultLocationID = input.getDefaultLocationID();
		List<UUID> defaultInstructorIDs = input.getDefaultInstructorIDs();

		validateNotEmpty(name, description);
		commonValidator.validateURL(photo);
		locationValidtor.validateID(defaultLocationID);
		validateDefaultInstructorIDs(defaultInstructorIDs);
		commonValidator.validatePrice(defaultPrice);
		validateEquipmentAndCapacity(defaultCapacity, defaultEquipmentAvailable);
		validateDuration(defaultDuration);
		validateCourseName(name);
	}

	private void validateNotEmpty(String name, String description) {
		if (name.isEmpty()) {
			throw new ResolverException("Name cannot be empty");
		}
		if (description.isEmpty()) {
			throw new ResolverException("Description cannot be empty");
		}
	}

	private void validateCourseName(String name) {
		if (courseDAO.existsByName(name)) {
			throw new ResolverException("Course with name already exists");
		}
	}

	private void validateDefaultInstructorIDs(List<UUID> defaultInstructorIDs) {
		if (defaultInstructorIDs.isEmpty()) {
			throw new ResolverException("Default instructor IDs cannot be empty");
		}

		for (UUID defaultInstructorID : defaultInstructorIDs) {
			instructorValidator.validateID(defaultInstructorID);
		}
	}

	private void validateEquipmentAndCapacity(
		Short defaultCapacity,
		Short defaultEquipmentAvailable
	) {
		if (defaultCapacity < defaultEquipmentAvailable) {
			throw new ResolverException("Cannot add more equipment than capacity");
		}
	}

	private void validateDuration(Short defaultDuration) {
		if (defaultDuration > 60 * 60 * 4) {
			throw new ResolverException("Duration cannot be greater than 4 hours");
		}
	}
}
