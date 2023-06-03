package com.xtremehiphopwithtash.book.model;

import java.util.UUID;

public class Details extends Base {

	private UUID detailsID;
	private String firstName;
	private String lastName;
	private String nickName;
	private String gender;
	private String mobilePhoneNumber;
	private String emailAddress;
	private String instagramUsername;

	public Details() {}

	public UUID getDetailsID() {
		return detailsID;
	}

	public void setDetailsID(UUID detailsID) {
		this.detailsID = detailsID;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobilePhoneNumber() {
		return mobilePhoneNumber;
	}

	public void setMobilePhoneNumber(String mobilePhoneNumber) {
		this.mobilePhoneNumber = mobilePhoneNumber;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getInstagramUsername() {
		return instagramUsername;
	}

	public void setInstagramUsername(String instagramUsername) {
		this.instagramUsername = instagramUsername;
	}
}
