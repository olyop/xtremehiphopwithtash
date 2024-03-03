package com.xtremehiphopwithtash.book.service.database.trends;

// import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TrendsService {

	private final TrendsDAO trendsDAO;

	public TrendsService(TrendsDAO trendsDAO) {
		this.trendsDAO = trendsDAO;
	}

	public List<TrendsBooking> retrieveBookingTrends(Instant startTime, Instant endTime) {
		List<TrendsBooking> bookingTrends = trendsDAO.selectBookingTrends(startTime, endTime);

		return addMissingDates(bookingTrends);
	}

	// add missing dates between start and end time if it has no bookings
	private List<TrendsBooking> addMissingDates(List<TrendsBooking> bookingTrends) {
		List<TrendsBooking> bookingTrendsAllDates = new ArrayList<>();

		Instant startTime = bookingTrends.get(bookingTrends.size() - 1).getUnixDay();
		Instant endTime = bookingTrends.get(0).getUnixDay();

		int numberOfDays = (int) ((endTime.getEpochSecond() - startTime.getEpochSecond()) / 86400);

		// loop through all days between start and end time in reverse order
		for (int i = numberOfDays; i >= 0; i--) {
			Instant day = startTime.plusSeconds(i * 86400);

			// if bookingTrends contains the day, add it to bookingTrendsAllDates
			if (bookingTrends.stream().anyMatch(bookingTrend -> bookingTrend.getUnixDay().equals(day))) {
				bookingTrendsAllDates.add(
					bookingTrends.stream().filter(bookingTrend -> bookingTrend.getUnixDay().equals(day)).findFirst().get()
				);
			} else {
				// else add a new TrendsBooking with 0 bookings
				TrendsBooking tb = new TrendsBooking();
				tb.setBookings(0);
				tb.setUnixDay(day);
				bookingTrendsAllDates.add(tb);
			}
		}

		return bookingTrendsAllDates;
	}
}
