package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.example.demo.security.CustomAccessDeniedHandler;
import com.example.demo.security.CustomLoginSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Autowired 
	UserDetailsService detailService;
	
	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}
	
	@Bean
	public AuthenticationSuccessHandler successHandler() {
		return new CustomLoginSuccessHandler();
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((requests) -> requests
//				.antMatchers("/**", "/home").permitAll()
//				.antMatchers("/", "/login").permitAll()
				.antMatchers("/comCodeInsert", "/insertusers", "/usersinfo", "/insertBom2").hasAnyRole("ADMIN")
				.antMatchers("/ordersInsert", "/prodReqInsert", "/exportInsert").hasAnyRole("PER00001", "ADMIN")
				.antMatchers("/prodPlan", "/prodInstruct").hasAnyRole("PER00002", "ADMIN")
				.antMatchers("/materials/orders", "/materials/warehousing", "/materials/outgoing").hasAnyRole("PER00003", "ADMIN")
				.antMatchers("/insertMatQuality", "/insertProQuality").hasAnyRole("PER00004", "ADMIN")
				.antMatchers("/inserteqm", "/eqminfo", "/insertnotopr", "/notoprinfo").hasAnyRole("PER00005", "ADMIN")
				.antMatchers("/companyInsert").hasAnyRole("PER00001", "PER00003", "ADMIN")
				.antMatchers("/").hasAnyRole("PER00001", "PER00002", "PER00003", "PER00004", "PER00005", "ADMIN")
				.antMatchers("/assets/**", "/css/**", "/fonts/**", "/js/**", "/scss/**", "/login", "/accessError", "/ajax/**", "/download/**").permitAll()
				.anyRequest().authenticated()
			)
			// 람다식
//			.formLogin((form) -> form
//					.loginPage("/login")
//					.permitAll()
//			)
			.formLogin().loginPage("/login")
						.usernameParameter("userid")
						.loginProcessingUrl("/userlogin")
						.successHandler(successHandler())
						.permitAll()
			.and()
//			.logout((logout) -> logout.permitAll())
			.logout().logoutSuccessUrl("/login")
					 .permitAll()
			.and()
//			.exceptionHandling().accessDeniedHandler(accessDeniedHandler());
			.exceptionHandling( handler -> handler.accessDeniedHandler(accessDeniedHandler()) )
//			.csrf().disable();
			.userDetailsService(detailService)
			;
		
		return http.build();
	}

//	@Bean
//	public UserDetailsService userDetailsService() {
//		UserDetails admin = 
//				User.withDefaultPasswordEncoder()
//					.username("admin")
//					.password("1111")
//					.roles("ADMIN")
//					.build();
//		
//		UserDetails user =
//				User.withDefaultPasswordEncoder()
//					.username("user")
//					.password("1111")
//					.roles("USER")
//					.build();
//
//		return new InMemoryUserDetailsManager(user, admin);
//	}
}