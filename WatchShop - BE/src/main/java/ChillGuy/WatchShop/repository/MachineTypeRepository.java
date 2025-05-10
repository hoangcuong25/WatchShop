package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.MachineType;

@Repository
public interface MachineTypeRepository extends JpaRepository<MachineType, Long> {
    Boolean existsByName(String name);
}
