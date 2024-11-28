package beforgts.ec.api_consultas.repository;

import beforgts.ec.api_consultas.domain.clientes.User;
import beforgts.ec.api_consultas.domain.clientes.UserID;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, UserID> {
    Optional<User> findByIdCpf(String cpf);
    Optional<User> findByIdRg(String rg);
    Optional<User> findByIdPlacaCarro(String placaCarro);

    @Transactional
    @Modifying
    void deleteByIdCpf(String cpf);
}
