package servlet.pahanaedu.bill.model;


public class BuyBook {
    private int id;
    private int billId;
    private int bookId;
    private int quantity;
    private double price;

    public BuyBook() {
    }

    public BuyBook(int billId, int bookId, int quantity, double price) {
        this.billId = billId;
        this.bookId = bookId;
        this.quantity = quantity;
        this.price = price;
    }

    public BuyBook(int id, int billId, int bookId, int quantity, double price) {
        this.id = id;
        this.billId = billId;
        this.bookId = bookId;
        this.quantity = quantity;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
