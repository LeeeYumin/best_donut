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
				.antMatchers("/assets/**", "/css/**", "/fonts/**", "/js/**", "/scss/**", "/login").permitAll()
//				.antMatchers("/assets/**", "/css/**", "/fonts/**", "/js/**", "/scss/**", 
//						"/", "/login", "/comCodeList", "/userslist", "/companyList", "/bomList", 
//						"/ordersList", "/prodReqList", "/productList", "/exportList", "/prodPlanList", "/process", "/processResult", 
//						"/materials/stockList", "/materials/ordersList", "/materials/inoutList", "/adminMatQuality", "/adminProQuality", 
//						"/eqmlist", "/notoprlist").permitAll()
				.antMatchers("/", "/comCodeList").hasAnyRole("PER00001", "PER00002", "PER00003", "PER00004", "PER00005")
//				.antMatchers("/ordersInsert", "/prodReqInsert", "/exportInsert", "/companyInsert").hasAnyRole("PER00001")
//				.antMatchers("/prodPlan", "/prodInstruct").hasAnyRole("PER00002")
//				.antMatchers("/materials/orders", "/materials/warehousing", "/materials/outgoing", "/companyInsert").hasAnyRole("PER00003")
//				.antMatchers("/insertMatQuality", "/insertProQuality").hasAnyRole("PER00004")
//				.antMatchers("/inserteqm", "/eqminfo", "/insertnotopr", "/notoprinfo").hasAnyRole("PER00005")
				.antMatchers("/**").hasAnyRole("ADMIN")
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