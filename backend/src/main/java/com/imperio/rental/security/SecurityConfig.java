package com.imperio.rental.security;


import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.jwk.source.ImmutableSecret;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	
	@Value("${jwt.security}")
	private String secretKey;
	
	/**
     * Defines an in-memory user for testing/admin purposes.
     * 
     * @param passwordEncoder Password encoder to encrypt user passwords.
     * @return An InMemoryUserDetailsManager with a predefined ADMIN user.
     */
	@Bean
	InMemoryUserDetailsManager inMemoryUserDetailsManager(PasswordEncoder passwordEncoder) {
		
		String pwd = passwordEncoder().encode("admin");
		return new InMemoryUserDetailsManager(
				User.withUsername("Admin").password(pwd).roles("ADMIN").build()
				);
				
		
	}
	
	
	 /**
     * Defines the password encoder bean.
     * 
     * @return A BCryptPasswordEncoder instance.
     */
	@Bean 
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	  /**
     * Configures security settings such as session management, CSRF protection, 
     * allowed endpoints, and OAuth2 JWT-based authentication.
     * 
     * @param httpSecurity The HttpSecurity instance.
     * @return Configured SecurityFilterChain.
     * @throws Exception In case of configuration errors.
     */
	@Bean 
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return  httpSecurity.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.csrf(csrf-> csrf.disable())
				.cors(Customizer.withDefaults())
				.authorizeHttpRequests(ar->ar.requestMatchers("/api/cars/auth/**").permitAll())
				.authorizeHttpRequests(ar->ar.requestMatchers("/api/cars/all/**").permitAll())
				.authorizeHttpRequests(ar->ar.anyRequest().authenticated())		
				.oauth2ResourceServer(oa->oa.jwt(Customizer.withDefaults()))
				.build();
		
	}
	
	  /**
     * Configures the JWT Encoder for signing tokens.
     * 
     * @return A NimbusJwtEncoder instance with a secret key.
     */
	@Bean
	JwtEncoder jwtEncoder() {
		
		
		return new NimbusJwtEncoder(new ImmutableSecret<>(secretKey.getBytes()));
	}
	
	 /**
     * Configures the JWT Decoder for verifying tokens.
     * 
     * @return A NimbusJwtDecoder instance with a secret key and algorithm.
     */
	@Bean 
	JwtDecoder jwtDecoder() {
		SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "RSA");
		return  NimbusJwtDecoder.withSecretKey(secretKeySpec).macAlgorithm(MacAlgorithm.HS512).build();
		
	}
	
	/**
     * Configures the AuthenticationManager with a DAO authentication provider.
     * 
     * @param userDetailsService The service for loading user details.
     * @return An AuthenticationManager instance.
     */
	@Bean 
	AuthenticationManager authenticationManager(UserDetailsService userDetailsService) {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		daoAuthenticationProvider.setUserDetailsService(userDetailsService );
		return new ProviderManager(daoAuthenticationProvider);
				
	}

}

