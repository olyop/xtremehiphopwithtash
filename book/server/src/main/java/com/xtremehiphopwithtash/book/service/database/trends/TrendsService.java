package com.xtremehiphopwithtash.book.service.database.trends;

// import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TrendsService {

	private final TrendsDAO trendsDAO;

	// private final String json =
	// "[{\"bookings\":7,\"unixDay\":1705363200},{\"bookings\":18,\"unixDay\":1705276800},{\"bookings\":3,\"unixDay\":1705190400},{\"bookings\":2,\"unixDay\":1705104000},{\"bookings\":3,\"unixDay\":1705017600},{\"bookings\":3,\"unixDay\":1704931200},{\"bookings\":5,\"unixDay\":1704758400},{\"bookings\":4,\"unixDay\":1704672000},{\"bookings\":2,\"unixDay\":1704585600},{\"bookings\":2,\"unixDay\":1704240000},{\"bookings\":4,\"unixDay\":1704153600},{\"bookings\":5,\"unixDay\":1704067200},{\"bookings\":1,\"unixDay\":1703894400},{\"bookings\":2,\"unixDay\":1703808000},{\"bookings\":5,\"unixDay\":1703721600},{\"bookings\":8,\"unixDay\":1703635200},{\"bookings\":5,\"unixDay\":1703548800},{\"bookings\":1,\"unixDay\":1703462400},{\"bookings\":5,\"unixDay\":1703116800},{\"bookings\":5,\"unixDay\":1703030400},{\"bookings\":2,\"unixDay\":1702944000},{\"bookings\":5,\"unixDay\":1702857600},{\"bookings\":1,\"unixDay\":1702771200},{\"bookings\":4,\"unixDay\":1702684800},{\"bookings\":1,\"unixDay\":1702598400},{\"bookings\":3,\"unixDay\":1702512000},{\"bookings\":2,\"unixDay\":1702425600},{\"bookings\":4,\"unixDay\":1702339200},{\"bookings\":1,\"unixDay\":1702252800},{\"bookings\":1,\"unixDay\":1702166400},{\"bookings\":1,\"unixDay\":1701993600},{\"bookings\":2,\"unixDay\":1701907200},{\"bookings\":5,\"unixDay\":1701820800},{\"bookings\":2,\"unixDay\":1701648000},{\"bookings\":1,\"unixDay\":1701475200},{\"bookings\":5,\"unixDay\":1701388800},{\"bookings\":3,\"unixDay\":1701302400},{\"bookings\":1,\"unixDay\":1701216000},{\"bookings\":5,\"unixDay\":1701129600},{\"bookings\":3,\"unixDay\":1701043200},{\"bookings\":4,\"unixDay\":1700956800},{\"bookings\":1,\"unixDay\":1700870400},{\"bookings\":8,\"unixDay\":1700697600},{\"bookings\":4,\"unixDay\":1700611200},{\"bookings\":7,\"unixDay\":1700524800},{\"bookings\":3,\"unixDay\":1700438400},{\"bookings\":2,\"unixDay\":1700352000},{\"bookings\":4,\"unixDay\":1700265600},{\"bookings\":3,\"unixDay\":1700179200},{\"bookings\":2,\"unixDay\":1700092800},{\"bookings\":4,\"unixDay\":1699920000},{\"bookings\":7,\"unixDay\":1699833600},{\"bookings\":2,\"unixDay\":1699747200},{\"bookings\":4,\"unixDay\":1699660800},{\"bookings\":1,\"unixDay\":1699574400},{\"bookings\":5,\"unixDay\":1699488000},{\"bookings\":3,\"unixDay\":1699401600},{\"bookings\":4,\"unixDay\":1699315200},{\"bookings\":6,\"unixDay\":1699228800},{\"bookings\":1,\"unixDay\":1699142400},{\"bookings\":1,\"unixDay\":1699056000},{\"bookings\":3,\"unixDay\":1698969600},{\"bookings\":5,\"unixDay\":1698883200},{\"bookings\":1,\"unixDay\":1698796800},{\"bookings\":3,\"unixDay\":1698710400},{\"bookings\":3,\"unixDay\":1698624000},{\"bookings\":1,\"unixDay\":1698537600},{\"bookings\":6,\"unixDay\":1698105600},{\"bookings\":4,\"unixDay\":1698019200},{\"bookings\":1,\"unixDay\":1697932800},{\"bookings\":5,\"unixDay\":1697846400},{\"bookings\":9,\"unixDay\":1697760000},{\"bookings\":3,\"unixDay\":1697587200},{\"bookings\":7,\"unixDay\":1697500800},{\"bookings\":5,\"unixDay\":1697414400},{\"bookings\":4,\"unixDay\":1697328000},{\"bookings\":1,\"unixDay\":1697241600},{\"bookings\":3,\"unixDay\":1697155200},{\"bookings\":2,\"unixDay\":1696896000},{\"bookings\":7,\"unixDay\":1696809600},{\"bookings\":3,\"unixDay\":1696723200},{\"bookings\":4,\"unixDay\":1696636800},{\"bookings\":3,\"unixDay\":1696291200},{\"bookings\":3,\"unixDay\":1696204800},{\"bookings\":4,\"unixDay\":1696118400},{\"bookings\":2,\"unixDay\":1696032000},{\"bookings\":2,\"unixDay\":1695945600},{\"bookings\":2,\"unixDay\":1695859200},{\"bookings\":5,\"unixDay\":1695772800},{\"bookings\":12,\"unixDay\":1695686400},{\"bookings\":6,\"unixDay\":1695600000},{\"bookings\":1,\"unixDay\":1695513600},{\"bookings\":5,\"unixDay\":1695427200},{\"bookings\":3,\"unixDay\":1695340800},{\"bookings\":7,\"unixDay\":1695254400},{\"bookings\":2,\"unixDay\":1695168000},{\"bookings\":7,\"unixDay\":1695081600},{\"bookings\":5,\"unixDay\":1694995200},{\"bookings\":7,\"unixDay\":1694736000},{\"bookings\":1,\"unixDay\":1694649600},{\"bookings\":2,\"unixDay\":1694563200},{\"bookings\":2,\"unixDay\":1694476800},{\"bookings\":6,\"unixDay\":1694390400},{\"bookings\":8,\"unixDay\":1694217600},{\"bookings\":2,\"unixDay\":1694131200},{\"bookings\":4,\"unixDay\":1694044800},{\"bookings\":1,\"unixDay\":1693958400},{\"bookings\":3,\"unixDay\":1693872000},{\"bookings\":8,\"unixDay\":1693785600},{\"bookings\":1,\"unixDay\":1693699200},{\"bookings\":2,\"unixDay\":1693612800},{\"bookings\":4,\"unixDay\":1693526400},{\"bookings\":3,\"unixDay\":1693353600},{\"bookings\":7,\"unixDay\":1693267200},{\"bookings\":3,\"unixDay\":1693180800},{\"bookings\":3,\"unixDay\":1693094400},{\"bookings\":1,\"unixDay\":1692748800},{\"bookings\":3,\"unixDay\":1692057600},{\"bookings\":2,\"unixDay\":1691971200},{\"bookings\":4,\"unixDay\":1691884800},{\"bookings\":1,\"unixDay\":1691798400},{\"bookings\":1,\"unixDay\":1691625600},{\"bookings\":8,\"unixDay\":1691539200},{\"bookings\":9,\"unixDay\":1691452800},{\"bookings\":10,\"unixDay\":1691366400},{\"bookings\":5,\"unixDay\":1691280000},{\"bookings\":3,\"unixDay\":1691107200},{\"bookings\":1,\"unixDay\":1691020800},{\"bookings\":3,\"unixDay\":1690934400},{\"bookings\":2,\"unixDay\":1690848000},{\"bookings\":5,\"unixDay\":1690761600},{\"bookings\":5,\"unixDay\":1690675200},{\"bookings\":8,\"unixDay\":1690588800},{\"bookings\":1,\"unixDay\":1690502400},{\"bookings\":2,\"unixDay\":1690416000},{\"bookings\":10,\"unixDay\":1690243200},{\"bookings\":11,\"unixDay\":1690156800},{\"bookings\":2,\"unixDay\":1690070400},{\"bookings\":5,\"unixDay\":1689984000},{\"bookings\":8,\"unixDay\":1689897600},{\"bookings\":2,\"unixDay\":1689811200},{\"bookings\":2,\"unixDay\":1689724800},{\"bookings\":4,\"unixDay\":1689638400},{\"bookings\":1,\"unixDay\":1689552000},{\"bookings\":2,\"unixDay\":1689465600},{\"bookings\":1,\"unixDay\":1689379200},{\"bookings\":3,\"unixDay\":1689292800},{\"bookings\":1,\"unixDay\":1689206400},{\"bookings\":1,\"unixDay\":1689120000},{\"bookings\":4,\"unixDay\":1689033600},{\"bookings\":5,\"unixDay\":1688947200},{\"bookings\":2,\"unixDay\":1688860800},{\"bookings\":3,\"unixDay\":1688774400},{\"bookings\":4,\"unixDay\":1688428800},{\"bookings\":7,\"unixDay\":1688342400},{\"bookings\":4,\"unixDay\":1688256000},{\"bookings\":1,\"unixDay\":1687996800},{\"bookings\":3,\"unixDay\":1687910400}]";

	public TrendsService(TrendsDAO trendsDAO) {
		this.trendsDAO = trendsDAO;
	}

	public List<TrendsBooking> retrieveBookingTrends(Instant startTime, Instant endTime) {
		List<TrendsBooking> bookingTrends = trendsDAO.selectBookingTrends(startTime, endTime);

		// List<TrendsBooking> bookingTrends = new ArrayList<>();

		// ObjectMapper mapper = new ObjectMapper();

		// // Convert json string to list of TrendsBookingInner
		// List<TrendsBookingInner> bookingTrendsInner = new ArrayList<>();

		// try {
		// 	bookingTrendsInner =
		// 		mapper.readValue(json, mapper.getTypeFactory().constructCollectionType(List.class, TrendsBookingInner.class));
		// } catch (Exception e) {
		// 	e.printStackTrace();
		// }

		// Convert list of TrendsBookingInner to list of TrendsBooking
		// for (TrendsBookingInner tbi : bookingTrendsInner) {
		// 	TrendsBooking tb = new TrendsBooking();
		// 	tb.setBookings(tbi.getBookings());
		// 	tb.setUnixDay(Instant.ofEpochSecond(tbi.getUnixDay()));
		// 	bookingTrends.add(tb);
		// }

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
