package servlet.pahanaedu.bill.service;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.mapper.BillMapper;
import servlet.pahanaedu.bill.model.Bill;
import servlet.persistence.bill.dao.BillDAO;

public class BillService {

    private final BillDAO billDAO = new BillDAO();

    public int createBill(BillDTO billDTO) {
        Bill bill = BillMapper.toEntity(billDTO);
        return billDAO.saveBill(bill);
    }


    public BillDTO getBillById(int billId) {
        Bill bill = billDAO.getBillById(billId); // Implement in DAO
        if (bill == null) return null;
        return BillMapper.toDTO(bill);
    }

}
