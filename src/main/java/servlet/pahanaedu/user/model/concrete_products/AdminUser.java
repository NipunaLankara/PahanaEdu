package servlet.pahanaedu.user.model.concrete_products;

import servlet.pahanaedu.user.model.User;

public class AdminUser extends User {
    @Override
    public String getPermissions() {
        return "FULL_ACCESS";
    }
}
