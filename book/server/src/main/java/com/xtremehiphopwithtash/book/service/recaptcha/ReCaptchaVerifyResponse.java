package com.xtremehiphopwithtash.book.service.recaptcha;

record VerifyResponse(boolean success, String hostname, float score, String action) {}
