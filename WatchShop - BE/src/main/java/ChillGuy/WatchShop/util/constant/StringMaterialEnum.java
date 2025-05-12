package ChillGuy.WatchShop.util.constant;

public enum StringMaterialEnum {
    LEATHER("Da"),
    METAL("Kim loại"),
    FIBER("Vải"),;

    private final String value;

    StringMaterialEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
