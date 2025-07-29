package servlet.pahanaedu.model;

public class AdminUser extends User {
    @Override
    public String getPermissions() {
        return "FULL_ACCESS";
    }
}

//vsvsd