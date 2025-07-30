
package servlet.pahanaedu.factory;

import servlet.pahanaedu.user.model.*;
import servlet.pahanaedu.user.model.concrete_products.AdminUser;
import servlet.pahanaedu.user.model.concrete_products.CustomerUser;
import servlet.pahanaedu.user.model.product.UserType;

public class UserFactory {

    public static UserType createUserByRole(String role) {
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }

        switch (role.toUpperCase()) {
            case "ADMIN":
                return new AdminUser();
            case "CUSTOMER":
                return new CustomerUser();
            default:
                return new User(); // fallback
        }
    }
}
