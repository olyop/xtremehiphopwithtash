package com.xtremehiphopwithtash.book.service;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.TextSearchRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.google.openlocationcode.OpenLocationCode;
import com.xtremehiphopwithtash.book.model.Place;
import com.xtremehiphopwithtash.book.other.Coordinates;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GoogleMaps {

	private final GeoApiContext context;

	public GoogleMaps(@Value("${google.api.key}") String apiKey) {
		this.context = new GeoApiContext.Builder().apiKey(apiKey).build();
	}

	public Place searchPlaceByName(String name)
		throws ApiException, InterruptedException, IOException {
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
		Coordinates coordinates = new Coordinates(latitude, longitude);

		return new Place(result.formattedAddress, olc.getCode(), coordinates);
	}
}