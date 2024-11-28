package beforgts.ec.api_consultas.controller;

import beforgts.ec.api_consultas.domain.clientes.UserConsultaDTO;
import beforgts.ec.api_consultas.domain.clientes.UserDTO;
import beforgts.ec.api_consultas.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class ConsultasController {

    @Autowired
    private UserService service;

    @PostMapping("/cadastrar")
    public ResponseEntity cadastrarUsuario(@RequestBody UserDTO dto) {
        this.service.cadastrarUsuario(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/listar")
    public ResponseEntity listarUsuarios() {
        return ResponseEntity.ok(this.service.listarUsuarios());
    }

    @GetMapping("/consultar/{filtro}/{valor}")
    public ResponseEntity consultarDados(@PathVariable String filtro, @PathVariable String valor) {
        UserDTO user = this.service.consultarDados(filtro, valor);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/atualizar")
    public ResponseEntity atualizarUsuario(@RequestBody UserDTO dto, @RequestBody UserConsultaDTO consultaDTO) {
        // não implementado
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/excluir/{cpf}")
    @Transactional
    public ResponseEntity deleterUsuario (@PathVariable String cpf) {
        this.service.deleteUser(cpf);
        return ResponseEntity.ok().build();
    }
}
