package beforgts.ec.api_consultas.service;

import beforgts.ec.api_consultas.domain.clientes.User;
import beforgts.ec.api_consultas.domain.clientes.UserConsultaDTO;
import beforgts.ec.api_consultas.domain.clientes.UserDTO;
import beforgts.ec.api_consultas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void cadastrarUsuario(UserDTO dto) {
        User user = new User(dto);
        this.repository.save(user);
    }

    public List<UserDTO> listarUsuarios() {
        return this.repository.findAll().stream().map(UserDTO::new).toList();
    }

    public UserDTO consultarDados(String filtro, String valor) {
        Optional<User> user = getUser(filtro, valor);
        return user.map(UserDTO::new).orElse(null);
    }



    public void atualizarUsuario(UserDTO dto, UserConsultaDTO consulta) {
//        Optional<User> user = getUser(consulta);
//        user.ifPresent(u -> {
//            u.setNome(dto.nome());
//            u.setEndereco(dto.endereco());
//            u.setDataNascimento(dto.dataNascimento());
//            this.repository.save(u);
//        });
    }

    public void deleteUser(String cpf) {
        this.repository.deleteByIdCpf(cpf);
    }

    private Optional<User> getUser(String filtro, String valor) {
        Optional<User> user = Optional.empty();
        if (filtro.equals("cpf")) {
            user = this.repository.findByIdCpf(valor);
        } else if (filtro.equals("rg")) {
            user = this.repository.findByIdRg(valor);
        } else if (filtro.equals("placaCarro")) {
            user = this.repository.findByIdPlacaCarro(valor);
        } else {
            System.out.println("Nenhum dado foi informado para consulta.");
        }
        return user;
    }
}
