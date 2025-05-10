package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.Diameters;

@Repository
public interface DiametersRepository extends JpaRepository<Diameters, Long> {
    Boolean existsByName(String name);
}