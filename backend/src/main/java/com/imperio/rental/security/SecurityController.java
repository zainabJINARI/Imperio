package com.imperio.rental.security;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
	
	
	
	
	 /**
     * Authenticates a user and generates a JWT access token.
     * 
     * @param username The username of the user.
     * @param password The password of the user.
     * @return A map containing the generated JWT access token.
     */
	@PostMapping("/login")
	public Map<String,String> login(String username, String password) {
        // Authenticate the user with Spring Security
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		
		 // Retrieve user authorities (roles) and convert them to a space-separated string
		String scope= authentication.getAuthorities().stream().map(a->a.getAuthority()).collect(Collectors.joining(" "));
		  // Generate the JWT token expiration time
		Instant instant = Instant.now();
		
		 // Create JWT claims set with issued time, expiration time, subject (username), and roles (scope)
		JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
				.issuedAt(instant)
				.expiresAt(instant.plus(40, ChronoUnit.MINUTES))
				.subject(username) 
				.claim("scope", scope)
				.build();
		  // Create JWT encoder parameters 
		JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(),
				jwtClaimsSet);
		   // Encode and generate the JWT token
		String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
		return Map.of("access-token",jwt);

				
	}
	
	 /**
     * Logs out the current user by clearing the security context.
     * 
     * @return A map containing a logout success message.
     */
	@PostMapping("/logout")
	public Map<String, String> logout() {
		SecurityContextHolder.clearContext();
		return Map.of("message", "Logout successful");
	}
	

}
