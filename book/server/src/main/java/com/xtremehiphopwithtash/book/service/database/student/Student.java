package com.xtremehiphopwithtash.book.service.database.student;

import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.util.UUID;

public class Student extends BaseModel {

	private String studentID;
	private UUID detailsID;
	private String stripeCustomerID;
	private Boolean hasSignedWaiver;

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

	public Boolean getHasSignedWaiver() {
		return hasSignedWaiver;
	}

	public void setHasSignedWaiver(Boolean hasSignedWaiver) {
		this.hasSignedWaiver = hasSignedWaiver;
	}
}
