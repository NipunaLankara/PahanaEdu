package servlet.pahanaedu.user.model;

public class CustomerUser extends User {
    @Override
    public String getPermissions() {
        return "LIMITED_ACCESS";
    }
}
