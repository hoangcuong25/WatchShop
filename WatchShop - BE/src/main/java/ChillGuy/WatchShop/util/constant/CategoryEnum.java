package ChillGuy.WatchShop.util.constant;

public enum CategoryEnum {
    MAN("Đồng hồ nam"),
    WOMAN("Đồng hồ nữ"),
    COUPLE("Đồng hồ đôi");

    private final String value;

    CategoryEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
