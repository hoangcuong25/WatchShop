package ChillGuy.WatchShop.util.constant;

public enum StyleEnum {
    CLASSIC("Cổ điển"),
    MODERN("Hiện đại"),
    SPORTS("Thể thao"),
    FANCY("Nghệ thuật"),
    ELEGANT("Trang nhã"),
    CASUAL("Thể thao");

    private final String value;

    StyleEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
