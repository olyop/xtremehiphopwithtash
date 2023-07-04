package com.xtremehiphopwithtash.book.model;

import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.time.Instant;
import java.util.UUID;

public class Booking extends Base {

	private UUID bookingID;
	private String notes;
	private UUID sessionID;
	private String studentID;
	private Integer bookingQuantity;
	private Integer equipmentQuantity;
	private PaymentMethod paymentMethod;
	private String paymentIntentID;
	private Integer cost;
	private boolean isCheckedIn;
	private boolean isCancelled;
	private Instant cancelledAt;

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

	public String getPaymentIntentID() {
		return paymentIntentID;
	}

	public void setPaymentIntentID(String paymentIntentID) {
		this.paymentIntentID = paymentIntentID;
	}

	public Integer getCost() {
		return cost;
	}

	public void setCost(Integer cost) {
		this.cost = cost;
	}

	public Boolean isCheckedIn() {
		return isCheckedIn;
	}

	public void setIsCheckedIn(Boolean isCheckedIn) {
		this.isCheckedIn = isCheckedIn;
	}

	public boolean isCancelled() {
		return isCancelled;
	}

	public void setIsCancelled(boolean isCancelled) {
		this.isCancelled = isCancelled;
	}

	public Instant getCancelledAt() {
		return cancelledAt;
	}

	public void setCancelledAt(Instant cancelledAt) {
		this.cancelledAt = cancelledAt;
	}
}
