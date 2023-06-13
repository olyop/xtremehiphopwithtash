package com.xtremehiphopwithtash.book.model;

import java.util.UUID;

public class Student extends Base {

	private String studentID;
	private UUID detailsID;
	private String stripeCustomerID;

	public Student() {}

	public String getStudentID() {
		return studentID;
	}

	public void setStudentID(String studentID) {
		this.studentID = studentID;
	}

	public UUID getDetailsID() {
		return detailsID;
	}

	public void setDetailsID(UUID detailsID) {
		this.detailsID = detailsID;
	}

	public String getStripeCustomerID() {
		return stripeCustomerID;
	}

	public void setStripeCustomerID(String stripeCustomerID) {
		this.stripeCustomerID = stripeCustomerID;
	}
}
