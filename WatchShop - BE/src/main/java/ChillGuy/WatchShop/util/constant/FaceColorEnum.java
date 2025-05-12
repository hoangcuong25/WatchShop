package ChillGuy.WatchShop.util.constant;

public enum FaceColorEnum {
    BLACK("Đen"),
    WHITE("Trắng"),
    SILVER("Bạc"),
    GOLD("Vàng"),
    BROWN("Nâu"),
    BLUE("Xanh dương"),
    GREEN("Xanh lá"),
    RED("Đỏ"),
    YELLOW("Vàng"),
    PINK("Hồng");

    private final String value;

    FaceColorEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
