package com.xtremehiphopwithtash.book.model;

import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.util.UUID;

public class Booking extends Base {

	private UUID bookingID;
	private String notes;
	private UUID sessionID;
	private String studentID;
	private Integer bookingQuantity;
	private Integer equipmentQuantity;
	private PaymentMethod paymentMethod;
	private Integer cost;

	public UUID getBookingID() {
		return bookingID;
	}

	public void setBookingID(UUID bookingID) {
		this.bookingID = bookingID;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public UUID getSessionID() {
		return sessionID;
	}

	public void setSessionID(UUID sessionID) {
		this.sessionID = sessionID;
	}

	public String getStudentID() {
		return studentID;
	}

	public void setStudentID(String studentID) {
		this.studentID = studentID;
	}

	public Integer getBookingQuantity() {
		return bookingQuantity;
	}

	public void setBookingQuantity(Integer bookingQuantity) {
		this.bookingQuantity = bookingQuantity;
	}

	public Integer getEquipmentQuantity() {
		return equipmentQuantity;
	}

	public void setEquipmentQuantity(Integer equipmentQuantity) {
		this.equipmentQuantity = equipmentQuantity;
	}

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Integer getCost() {
		return cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}
}
