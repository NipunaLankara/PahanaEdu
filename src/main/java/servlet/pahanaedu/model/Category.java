package servlet.pahanaedu.model;

public class Category {
    private final int id;
    private final String name;
    private final String description;

    private Category(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.description = builder.description;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public static class Builder {
        private int id;
        private String name;
        private String description;

        public Builder() {
            // optional constructor
        }

        public Builder id(int id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Category build() {
            return new Category(this);
        }
    }
}
