package beforgts.ec.api_consultas.domain.clientes;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserID {
    private String cpf;
    private String rg;
    private String placaCarro;
}
