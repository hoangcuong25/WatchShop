package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ChillGuy.WatchShop.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
