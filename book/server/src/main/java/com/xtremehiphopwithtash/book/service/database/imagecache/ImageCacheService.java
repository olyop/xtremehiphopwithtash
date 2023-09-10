package com.xtremehiphopwithtash.book.service.database.imagecache;

import java.util.HashMap;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class ImageCacheService {

	private final HashMap<UUID, ImageCacheItem> cache = new HashMap<>();
}
