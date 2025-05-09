package ChillGuy.WatchShop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import ChillGuy.WatchShop.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    // User findByEmail(String email);

    // boolean existsByEmail(String email);

    // User findByRefreshTokenAndEmail(String token, String email);

}
