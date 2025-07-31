package servlet.pahanaedu.bill.dto;

import servlet.pahanaedu.book.dto.BookDTO;

public class BuyBookDTO {
    private int bookId;
    private int quantity;
    private double price;
    private BookDTO book;

    public BuyBookDTO() {
    }

    public BuyBookDTO(int bookId, int quantity, double price, BookDTO book) {
        this.bookId = bookId;
        this.quantity = quantity;
        this.price = price;
        this.book = book;
    }

    // Getters and Setters
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

    public BookDTO getBook() {
        return book;
    }

    public void setBook(BookDTO book) {
        this.book = book;
    }
}
