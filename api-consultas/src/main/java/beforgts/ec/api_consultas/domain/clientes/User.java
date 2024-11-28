package beforgts.ec.api_consultas.domain.clientes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "cadastros")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @EmbeddedId
    private UserID id;
    private String nome;
    private String endereco;
    private Date dataNascimento;

    public User(UserDTO dto) {
        this.id = new UserID(dto.cpf(), dto.rg(), dto.placaCarro());
        this.nome = dto.nome();
        this.endereco = dto.endereco();
        this.dataNascimento = dto.dataNascimento();
    }
}
