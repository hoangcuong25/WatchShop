package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.StringMaterials;

@Repository
public interface StringMaterialsRepository extends JpaRepository<StringMaterials, Long> {
    Boolean existsByName(String name);
}