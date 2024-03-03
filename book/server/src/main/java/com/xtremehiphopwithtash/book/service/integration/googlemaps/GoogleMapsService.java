package com.xtremehiphopwithtash.book.service.integration.googlemaps;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.TextSearchRequest;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.google.openlocationcode.OpenLocationCode;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GoogleMapsService {

	private final GeoApiContext context;

	public GoogleMapsService(@Value("${google.api.key}") String apiKey) {
		this.context = new GeoApiContext.Builder().apiKey(apiKey).build();
	}

	public GoogleMapsPlace searchPlaceByName(String name) {
		try {
			TextSearchRequest request = PlacesApi.textSearchQuery(context, name);

			PlacesSearchResponse response = request.await();
			List<PlacesSearchResult> results = new ArrayList<>(Arrays.asList(response.results));

			if (results.isEmpty()) {
				return null;
			}

			PlacesSearchResult result = results.get(0);

			double latitude = result.geometry.location.lat;
			double longitude = result.geometry.location.lng;

			OpenLocationCode olc = new OpenLocationCode(latitude, longitude);
			GoogleMapsCoordinates coordinates = new GoogleMapsCoordinates(latitude, longitude);

			return new GoogleMapsPlace(result.formattedAddress, olc.getCode(), coordinates);
		} catch (Exception e) {
			throw new ResolverException(e);
		}
	}
}
