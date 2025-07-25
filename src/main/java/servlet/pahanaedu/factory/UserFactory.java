package servlet.pahanaedu.factory;

import servlet.pahanaedu.model.*;

public class UserFactory {
    public static User createUser(String role) {
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }

        switch (role.toUpperCase()) {
            case "ADMIN":
                return new AdminUser();
            case "CUSTOMER":
                return new CustomerUser();
            default:
                return new User(); // fallback to base User
        }
    }
}


