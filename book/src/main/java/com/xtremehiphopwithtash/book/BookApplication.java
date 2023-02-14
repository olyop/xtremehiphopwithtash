package com.xtremehiphopwithtash.book;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
import com.xtremehiphopwithtash.book.model.Details;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookApplication implements CommandLineRunner {

	@Autowired
	DetailsDAO detailsDAO;

	@Autowired
	InstructorDAO instructorDAO;

	public static void main(String[] args) {
		SpringApplication.run(BookApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Details details = new Details();

		details.setFirstName("Natasha");
		details.setLastName("Brown");
		details.setNickName("Tash");
		details.setGender("FEMALE");
		details.setMobilePhoneNumber("0123456789");

		detailsDAO.updateByID(UUID.fromString("5593dae6-1dcf-46f0-846d-a68044df57dc"), details);
	}
}
