package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.Styles;

@Repository
public interface StyleRepository extends JpaRepository<Styles, Long> {
    Boolean existsByName(String name);
}
