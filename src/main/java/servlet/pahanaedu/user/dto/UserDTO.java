package servlet.pahanaedu.user.dto;

public class UserDTO {
    private int id;
    private String name;
    private String address;
    private String email;
    private String nic;
    private String contactNumber;
    private String role;

    private String password;
    private String confirmPassword; // only for validation, not stored in DB

    public UserDTO() {}


    public UserDTO(String name, String address, String email, String nic, String contactNumber, String password, String confirmPassword) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.nic = nic;
        this.contactNumber = contactNumber;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = "CUSTOMER";  // default role
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
