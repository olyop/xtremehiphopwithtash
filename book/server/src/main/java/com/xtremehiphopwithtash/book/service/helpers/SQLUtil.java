package com.xtremehiphopwithtash.book.service.helpers;

import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;

public class SQLUtil {

	private final String basePath = "sql";
	private final String modulePath;
	private final String columnNames;

	public SQLUtil(String modulePath) {
		this.modulePath = modulePath;
		this.columnNames = "";
	}

	public SQLUtil(String modulePath, String columnNames) {
		this.modulePath = modulePath;
		this.columnNames = columnNames;
	}

	public String read(String fileName) {
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
