package ChillGuy.WatchShop.service;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.repository.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
}
