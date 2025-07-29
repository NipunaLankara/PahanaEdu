package servlet.pahanaedu.user.model;

public class AdminUser extends User {
    @Override
    public String getPermissions() {
        return "FULL_ACCESS";
    }
}

//vsvsd