package com.imperio.rental.security;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cars/auth")
@CrossOrigin
public class SecurityController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	JwtEncoder jwtEncoder ;
	
	
	
	
	

	@PostMapping("/login")
	public Map<String,String> login(String username, String password) {
//		Authentifier l'utilisateur avec spring security
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		
//		get user authorities like the roles of the current user
		String scope= authentication.getAuthorities().stream().map(a->a.getAuthority()).collect(Collectors.joining(" "));
//		generer le JWT
//		generer la date system pour créer le temps de validite de token JWT
		Instant instant = Instant.now();
		
//		creer JWT claims set
		JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
				.issuedAt(instant)
				.expiresAt(instant.plus(10, ChronoUnit.MINUTES))
				.subject(username) 
				.claim("scope", scope)
				.build();
//		creer le JWT Encoder parameters 
		JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(),
				jwtClaimsSet);
		String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
		return Map.of("access-token",jwt);

				
	}
	
	

}
