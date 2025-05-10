package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.FaceColors;

@Repository
public interface FaceColorsRepository extends JpaRepository<FaceColors, Long> {
    Boolean existsByName(String name);
}