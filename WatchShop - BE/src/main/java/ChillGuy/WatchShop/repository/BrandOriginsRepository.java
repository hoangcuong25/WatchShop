package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.BrandOrigins;

@Repository
public interface BrandOriginsRepository extends JpaRepository<BrandOrigins, Long> {
    Boolean existsByName(String name);
}