package beforgts.ec.api_consultas.domain.clientes;

import java.util.Date;

public record UserDTO(String nome,
                      String cpf,
                      String rg,
                      String endereco,
                      String placaCarro ,
                      Date dataNascimento) {

    public UserDTO(User user) {
        this(user.getNome(),user.getId().getCpf(), user.getId().getRg(),user.getEndereco(), user.getId().getPlacaCarro()
                , user.getDataNascimento());
    }
}
