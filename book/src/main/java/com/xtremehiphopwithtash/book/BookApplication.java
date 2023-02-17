package com.xtremehiphopwithtash.book;

import com.xtremehiphopwithtash.book.dao.DetailsDAO;
import com.xtremehiphopwithtash.book.dao.InstructorDAO;
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
	public void run(String... args) throws Exception {}
}
