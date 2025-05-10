package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    
}
