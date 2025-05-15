package ChillGuy.WatchShop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.domain.Order;
import ChillGuy.WatchShop.domain.request.OrderRequestDTO;
import ChillGuy.WatchShop.service.OrderService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@RestController
@RequestMapping("/api/v1")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    @ApiMessage("Create a new order")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequestDTO orderRequest)
            throws ThrowBadReqException {
        Order order = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(order);
    }
}
