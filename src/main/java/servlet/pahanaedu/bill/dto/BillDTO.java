package servlet.pahanaedu.bill.dto;

import java.util.List;

public class BillDTO {
    private int customerId;
    private double totalAmount;
    private List<BuyBookDTO> items;

    public BillDTO() {
    }

    public BillDTO(int customerId, double totalAmount, List<BuyBookDTO> items) {
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
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
}

//scacacsa...