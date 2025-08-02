package servlet.pahanaedu.user.model.concrete_products;

import servlet.pahanaedu.user.model.User;

public class CustomerUser extends User {
    @Override
    public String getPermissions() {
        return "LIMITED_ACCESS";
    }
}
