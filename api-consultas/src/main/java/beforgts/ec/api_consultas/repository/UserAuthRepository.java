package beforgts.ec.api_consultas.repository;

import beforgts.ec.api_consultas.domain.admin.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    Optional<UserAuth> findByUsername(String username);
}
