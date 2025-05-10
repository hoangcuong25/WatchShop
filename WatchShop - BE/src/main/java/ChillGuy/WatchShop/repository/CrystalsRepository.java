package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.Crystals;

@Repository
public interface CrystalsRepository extends JpaRepository<Crystals, Long> {
    Boolean existsByName(String name);
}