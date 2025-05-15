package ChillGuy.WatchShop.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Order;
import ChillGuy.WatchShop.domain.OrderItem;
import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.request.OrderRequestDTO;
import ChillGuy.WatchShop.domain.request.OrderRequestDTO.OrderItemRequest;
import ChillGuy.WatchShop.repository.OrderItemRepository;
import ChillGuy.WatchShop.repository.OrderRepository;
import ChillGuy.WatchShop.repository.ProductRepository;
import ChillGuy.WatchShop.repository.UserRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository,
            ProductRepository productRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public Order createOrder(OrderRequestDTO orderRequest) throws ThrowBadReqException {
        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new ThrowBadReqException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(Instant.now());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setStatus("PENDING");

        List<OrderItem> orderItems = new ArrayList<>();
        double totalPrice = 0;

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(Double.valueOf(product.getNewPrice()));
            item.setOrder(order);

            orderItems.add(item);
            totalPrice += Double.valueOf(product.getNewPrice()) * itemRequest.getQuantity();

            product.setStockQuantity(product.getStockQuantity() - itemRequest.getQuantity());
        }

        order.setTotalPrice(java.math.BigDecimal.valueOf(totalPrice));
        order.setOrderItems(orderItems);

        orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        return order;
    }
}
