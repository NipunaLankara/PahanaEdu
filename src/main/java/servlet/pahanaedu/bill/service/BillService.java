package servlet.pahanaedu.bill.service;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.mapper.BillMapper;
import servlet.pahanaedu.bill.model.Bill;
import servlet.persistence.bill.dao.BillDAO;

import java.util.ArrayList;
import java.util.List;

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

    public List<BillDTO> getAllBills() {
        List<Bill> bills = billDAO.getAllBills();
        List<BillDTO> dtos = new ArrayList<>();

        for (Bill bill : bills) {
            dtos.add(BillMapper.toDTO(bill));
        }

        return dtos;
    }


}
