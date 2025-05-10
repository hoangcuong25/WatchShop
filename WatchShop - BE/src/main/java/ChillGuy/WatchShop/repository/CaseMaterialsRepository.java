package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.CaseMaterials;

@Repository
public interface CaseMaterialsRepository extends JpaRepository<CaseMaterials, Long> {
    Boolean existsByName(String name);
}