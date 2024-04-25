package com.example.demo.users;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
public class CustomUsers implements UserDetails {
	
	private UsersVO usersVO;
	private List<String> perm;
	
	public CustomUsers(UsersVO usersVO, List<String> perm) {
		this.usersVO = usersVO;
		this.perm = perm;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authlist = new ArrayList<>();
		for(int i = 0; i < perm.size(); i ++) {
			authlist.add(new SimpleGrantedAuthority(perm.get(i)));			
		}
		return authlist;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return "{noop}" + usersVO.getUsersCode();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return usersVO.getUsersCode();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
