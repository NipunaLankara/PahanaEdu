package servlet.pahanaedu.bill.mapper;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.dto.BuyBookDTO;
import servlet.pahanaedu.bill.model.Bill;
import servlet.pahanaedu.bill.model.BuyBook;

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
}
