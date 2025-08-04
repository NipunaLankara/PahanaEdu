package servlet.pahanaedu.bill.dto;

import servlet.pahanaedu.user.dto.UserDTO;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class BillDTO {
    private int id;
    private String customerId;
    private double totalAmount;
    private List<BuyBookDTO> items;
    private UserDTO customer;
    private Date createdAt; // Add this field

    public BillDTO() {
    }


    public BillDTO(String customerId, double total, List<BuyBookDTO> items) {
        this.customerId = customerId;
        this.totalAmount = total;
        this.items = items;
    }


    public BillDTO(int id, String customerId, double totalAmount, List<BuyBookDTO> items, Date createdAt) {
        this.id = id;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.items = items;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getters and Setters
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<BuyBookDTO> getItems() {
        return items;
    }

    public void setItems(List<BuyBookDTO> items) {
        this.items = items;
    }

    public UserDTO getCustomer() {
        return customer;
    }

    public void setCustomer(UserDTO customer) {
        this.customer = customer;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
