package beforgts.ec.api_consultas.controller;

import beforgts.ec.api_consultas.domain.admin.LoginResponseDTO;
import beforgts.ec.api_consultas.domain.admin.UserAuth;
import beforgts.ec.api_consultas.domain.admin.UserAuthDTO;
import beforgts.ec.api_consultas.domain.admin.UserLoginDTO;
import beforgts.ec.api_consultas.infra.security.TokenService;
import beforgts.ec.api_consultas.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/autenticacao")
public class AutenticacaoController {

    @Autowired
    private UserAuthRepository repository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity entrar(@RequestBody UserLoginDTO dto) {
        UserAuth user = this.repository.findByUsername(dto.username())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (new BCryptPasswordEncoder().matches(dto.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginResponseDTO(token));
        }
        return ResponseEntity.badRequest().build();
    }
    @PostMapping("/registrar")
    public ResponseEntity registrar(@RequestBody UserAuthDTO dto) {
        if (this.repository.findByUsername(dto.username()).isPresent()) {
            System.out.println(dto.username());
            System.out.println("Usuário já cadastrado");
            return ResponseEntity.badRequest().build();
        }
       String passwordEncoded = new BCryptPasswordEncoder().encode(dto.password());
       UserAuth user = new UserAuth(dto.nome(),dto.username(), passwordEncoded);
       this.repository.save(user);
       return ResponseEntity.ok().build();
    }
}
