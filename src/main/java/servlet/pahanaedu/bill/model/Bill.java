package servlet.pahanaedu.bill.model;

import java.util.Date;
import java.util.List;

public class Bill {
    private int id;
    private int customerId;
    private double totalAmount;
    private Date createdAt;
    private List<BuyBook> buyBooks;

    public Bill() {
    }

    public Bill(int customerId, double totalAmount, Date createdAt, List<BuyBook> buyBooks) {
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.buyBooks = buyBooks;
    }

    public Bill(int id, int customerId, double totalAmount, Date createdAt, List<BuyBook> buyBooks) {
        this.id = id;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
        this.buyBooks = buyBooks;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<BuyBook> getBuyBooks() {
        return buyBooks;
    }

    public void setBuyBooks(List<BuyBook> buyBooks) {
        this.buyBooks = buyBooks;
    }
}
