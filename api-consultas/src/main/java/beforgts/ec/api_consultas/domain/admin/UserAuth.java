package beforgts.ec.api_consultas.domain.admin;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "contas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAuth implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String username;
    private String password;
    private UserRole role;

    public UserAuth(String nome, String username, String passwordEncoded) {
        this.nome = nome;
        this.username = username;
        this.password = passwordEncoded;
        this.role = UserRole.USER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       if (this.role == UserRole.USER ) {
           return List.of(new SimpleGrantedAuthority("ROLE_USER"));
       } else if (this.role == UserRole.ADMIN) {
           return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
       } else {
           return List.of(new SimpleGrantedAuthority("ROLE_USER"));
       }
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
