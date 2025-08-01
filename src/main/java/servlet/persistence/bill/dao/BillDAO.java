package servlet.persistence.bill.dao;

import servlet.pahanaedu.bill.model.Bill;
import servlet.pahanaedu.bill.model.BuyBook;
import servlet.persistence.db.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class BillDAO {

    public int saveBill(Bill bill) {
        String insertBillSQL = "INSERT INTO bill (customer_id, total_amount, created_at) VALUES (?, ?, NOW())";
        String insertBuySQL = "INSERT INTO buy_books (bill_id, book_id, quantity, price) VALUES (?, ?, ?, ?)";

        try (Connection conn = DBConnection.getInstance().getConnection()) {
            conn.setAutoCommit(false);

            try (PreparedStatement billStmt = conn.prepareStatement(insertBillSQL, Statement.RETURN_GENERATED_KEYS)) {
                billStmt.setString(1, bill.getCustomerId());
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
                        return billId;
                    } else {
                        conn.rollback();
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }


    public Bill getBillById(int billId) {
        String billSQL = "SELECT * FROM bill WHERE id = ?";
        String itemsSQL = "SELECT * FROM buy_books WHERE bill_id = ?";

        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement billStmt = conn.prepareStatement(billSQL);
             PreparedStatement itemsStmt = conn.prepareStatement(itemsSQL)) {

            billStmt.setInt(1, billId);
            ResultSet billRs = billStmt.executeQuery();

            if (!billRs.next()) return null;

            String customerId = billRs.getString("customer_id");
            double total = billRs.getDouble("total_amount");
            Date createdAt = new Date(billRs.getTimestamp("created_at").getTime());

            List<BuyBook> items = new ArrayList<>();
            itemsStmt.setInt(1, billId);
            ResultSet itemRs = itemsStmt.executeQuery();
            while (itemRs.next()) {
                items.add(new BuyBook(
                        itemRs.getInt("id"),
                        billId,
                        itemRs.getInt("book_id"),
                        itemRs.getInt("quantity"),
                        itemRs.getDouble("price")
                ));
            }

            return new Bill(billId, customerId, total, createdAt, items);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }


}
