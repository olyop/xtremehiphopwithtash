SELECT UNNEST(ENUM_RANGE(NULL::payment_methods)) AS payment_methods;