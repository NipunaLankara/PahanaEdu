package servlet.pahanaedu.model;

public class CustomerUser extends User {
    @Override
    public String getPermissions() {
        return "LIMITED_ACCESS";
    }
}
