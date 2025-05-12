package ChillGuy.WatchShop.util.constant;

public enum DesignEnum {
    SQUARE("Mặt vuông"),
    ROUND("Mặt tròn"),
    OVAL("Mặt oval"),
    RECTANGLE("Mặt chữ nhật"),
    ELSE("Khác");

    private final String value;

    DesignEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}