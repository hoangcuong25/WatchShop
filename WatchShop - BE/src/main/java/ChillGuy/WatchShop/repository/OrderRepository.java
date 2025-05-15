package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
