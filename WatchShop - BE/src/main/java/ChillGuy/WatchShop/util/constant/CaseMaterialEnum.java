package ChillGuy.WatchShop.util.constant;

public enum CaseMaterialEnum {
    STEEL("Thép"),
    GOLD("Vàng"),
    SILVER("Bạc"),
    TITANIUM("Titanium");

    private final String value;

    CaseMaterialEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}