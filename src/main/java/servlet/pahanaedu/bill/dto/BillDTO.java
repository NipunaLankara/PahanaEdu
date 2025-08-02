package servlet.pahanaedu.bill.dto;

import servlet.pahanaedu.user.dto.UserDTO;

import java.util.List;

public class BillDTO {
    private String customerId;
    private double totalAmount;
    private List<BuyBookDTO> items;

    private UserDTO customer;

    public BillDTO() {
    }

    public BillDTO(String customerId, double totalAmount, List<BuyBookDTO> items) {
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.items = items;
    }

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
}

//scacacsa...