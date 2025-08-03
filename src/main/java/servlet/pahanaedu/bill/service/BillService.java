package servlet.pahanaedu.bill.service;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.dto.BuyBookDTO;
import servlet.pahanaedu.bill.mapper.BillMapper;
import servlet.pahanaedu.bill.model.Bill;
import servlet.persistence.bill.dao.BillDAO;
import servlet.persistence.book.dao.BookDAO;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BillService {

    private final BillDAO billDAO = new BillDAO();
    private final BookDAO bookDAO = new BookDAO();

//    public int createBill(BillDTO billDTO) {
//        Bill bill = BillMapper.toEntity(billDTO);
//        return billDAO.saveBill(bill);
//    }

public int createBill(BillDTO billDTO) {
    Bill bill = BillMapper.toEntity(billDTO);
    int billId = billDAO.saveBill(bill);

    if (billId != -1) {
        for (BuyBookDTO item : billDTO.getItems()) {
            int bookId = item.getBookId();
            int qtySold = item.getQuantity();
            try {
                bookDAO.reduceQuantity(bookId, qtySold); // Create this method
            } catch (SQLException e) {
                e.printStackTrace();
                // Optional: rollback/handle
            }
        }
    }

    return billId;
}



    public BillDTO getBillById(int billId) {
        Bill bill = billDAO.getBillById(billId); // Implement in DAO
        if (bill == null) return null;
        return BillMapper.toDTO(bill);
    }

    public List<BillDTO> getAllBills() {
        List<Bill> bills = billDAO.getAllBills();
        List<BillDTO> dtos = new ArrayList<>();

        for (Bill bill : bills) {
            dtos.add(BillMapper.toDTO(bill));
        }

        return dtos;
    }


}
