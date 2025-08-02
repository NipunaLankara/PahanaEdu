package servlet.pahanaedu.bill.mapper;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.dto.BuyBookDTO;
import servlet.pahanaedu.bill.model.Bill;
import servlet.pahanaedu.bill.model.BuyBook;
import servlet.pahanaedu.book.dto.BookDTO;
import servlet.pahanaedu.book.model.Book;
import servlet.persistence.book.dao.BookDAO;

import java.util.ArrayList;
import java.util.List;

public class BillMapper {

    public static Bill toEntity(BillDTO dto) {
        Bill bill = new Bill();
        bill.setCustomerId(dto.getCustomerId());
        bill.setTotalAmount(dto.getTotalAmount());

        List<BuyBook> buyBooks = new ArrayList<>();
        for (BuyBookDTO item : dto.getItems()) {
            BuyBook book = new BuyBook();
            book.setBookId(item.getBookId());
            book.setQuantity(item.getQuantity());
            book.setPrice(item.getPrice());
            buyBooks.add(book);
        }

        bill.setBuyBooks(buyBooks);
        return bill;
    }

    public static BillDTO toDTO(Bill entity) {
        List<BuyBookDTO> items = new ArrayList<>();
        BookDAO bookDAO = new BookDAO();

        for (BuyBook item : entity.getBuyBooks()) {
            Book book = bookDAO.getBookById(item.getBookId());
            BookDTO bookDTO = new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getPrice(), book.getQuantity(), book.getCategoryId());
            items.add(new BuyBookDTO(bookDTO, item.getQuantity(), item.getPrice()));
        }

        return new BillDTO(entity.getCustomerId(), entity.getTotalAmount(), items);
    }
}
