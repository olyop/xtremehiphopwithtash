package com.xtremehiphopwithtash.book.service.integration.recaptcha;

record VerifyResponse(boolean success, String hostname, float score, String action) {}
