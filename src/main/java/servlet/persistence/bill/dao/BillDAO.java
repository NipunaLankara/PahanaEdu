package servlet.persistence.bill.dao;

import servlet.pahanaedu.bill.model.Bill;
import servlet.pahanaedu.bill.model.BuyBook;
import servlet.persistence.db.DBConnection;

import java.sql.*;


public class BillDAO {

    public boolean saveBill(Bill bill) {
        String insertBillSQL = "INSERT INTO bill (customer_id, total_amount, created_at) VALUES (?, ?, NOW())";
        String insertBuySQL = "INSERT INTO buy_books (bill_id, book_id, quantity, price) VALUES (?, ?, ?, ?)";

        try (Connection conn = DBConnection.getInstance().getConnection()) {
            conn.setAutoCommit(false);

            try (PreparedStatement billStmt = conn.prepareStatement(insertBillSQL, Statement.RETURN_GENERATED_KEYS)) {
                billStmt.setInt(1, bill.getCustomerId());
                billStmt.setDouble(2, bill.getTotalAmount());
                billStmt.executeUpdate();

                try (ResultSet rs = billStmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        int billId = rs.getInt(1);

                        try (PreparedStatement buyStmt = conn.prepareStatement(insertBuySQL)) {
                            for (BuyBook item : bill.getBuyBooks()) {
                                buyStmt.setInt(1, billId);
                                buyStmt.setInt(2, item.getBookId());
                                buyStmt.setInt(3, item.getQuantity());
                                buyStmt.setDouble(4, item.getPrice());
                                buyStmt.addBatch();
                            }

                            buyStmt.executeBatch();
                        }

                        conn.commit();
                        return true;
                    } else {
                        conn.rollback();
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
}
