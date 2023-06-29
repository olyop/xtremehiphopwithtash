package com.xtremehiphopwithtash.book.service.dao.query;

import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;

public class SQLUtil {

	private final String basePath = "sql";
	private final String modulePath;
	private final String columnNames;

	SQLUtil(String modulePath) {
		this.modulePath = modulePath;
		this.columnNames = "";
	}

	SQLUtil(String modulePath, String columnNames) {
		this.modulePath = modulePath;
		this.columnNames = columnNames;
	}

	String read(String fileName) {
		Path fullPath = Paths.get(basePath, modulePath, fileName + ".sql");

		ResourceLoader loader = new DefaultResourceLoader();

		try {
			String sql = new String(loader.getResource(fullPath.toString()).getInputStream().readAllBytes());

			if (columnNames.isEmpty()) {
				return sql;
			} else {
				if (sql.contains("%s")) {
					return String.format(sql, columnNames);
				} else {
					return sql;
				}
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
