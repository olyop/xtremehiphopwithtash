package com.xtremehiphopwithtash.book.service.peopleservice;

import com.auth0.json.mgmt.users.User;
import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0ManagementService;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class PeopleService {

	BookingService bookingService;
	Auth0ManagementService auth0ManagementService;

	public PeopleService(BookingService bookingService, Auth0ManagementService auth0ManagementService) {
		this.bookingService = bookingService;
		this.auth0ManagementService = auth0ManagementService;
	}

	public List<String> retrievePeopleBySessionID(UUID sessionID) {
		return bookingService
			.retreiveBySessionID(sessionID)
			.stream()
			.map(booking -> booking.getStudentID())
			.collect(Collectors.toCollection(HashSet::new))
			.parallelStream()
			.map(this::handleUser)
			.sorted(userComparator)
			.map(this::getProfilePhoto)
			.collect(Collectors.toList())
			.subList(0, 5);
	}

	private User handleUser(String studentID) {
		User user = auth0ManagementService.getUser(studentID);

		System.out.println("User: " + user.getUpdatedAt());

		return user;
	}

	private String getProfilePhoto(User user) {
		return user.getPicture();
	}

	private Comparator<User> userComparator = new Comparator<User>() {
		@Override
		public int compare(User user1, User user2) {
			return user1.getUpdatedAt().compareTo(user2.getUpdatedAt()) * -1;
		}
	};
}
