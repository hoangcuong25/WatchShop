package ChillGuy.WatchShop.util.constant;

public enum BrandOriginEnum {
    GERMANY("Đức"),
    SWITZERLAND("Thụy Sĩ"),
    JAPAN("Nhật Bản"),
    USA("Mỹ");

    private final String value;

    BrandOriginEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
