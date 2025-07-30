package servlet.pahanaedu.bill.service;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.mapper.BillMapper;
import servlet.pahanaedu.bill.model.Bill;
import servlet.persistence.bill.dao.BillDAO;

public class BillService {

    private final BillDAO billDAO = new BillDAO();

    public boolean createBill(BillDTO billDTO) {
        Bill bill = BillMapper.toEntity(billDTO);
        return billDAO.saveBill(bill);
    }
}
