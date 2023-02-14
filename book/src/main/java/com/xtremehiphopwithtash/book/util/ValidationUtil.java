package com.xtremehiphopwithtash.book.util;

import com.google.openlocationcode.OpenLocationCode;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.URL;

public class ValidationUtil {

	public static boolean validateURL(URL url) {
		try (Socket socket = new Socket()) {
			socket.connect(new InetSocketAddress(url.getHost(), 443), 1000);
			return true;
		} catch (IOException e) {
			// Either timeout or unreachable or failed DNS lookup.
			return false;
		}
	}

	public static boolean verifyPlusCode(String plusCode) {
		try {
			OpenLocationCode olc = new OpenLocationCode(plusCode);
			return olc.isFull();
		} catch (IllegalArgumentException e) {
			return false;
		}
	}
}
