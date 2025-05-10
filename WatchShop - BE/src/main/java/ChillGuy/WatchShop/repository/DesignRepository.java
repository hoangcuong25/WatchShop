package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.Design;

@Repository
public interface DesignRepository extends JpaRepository<Design, Long> {
    Boolean existsByName(String name);
}
