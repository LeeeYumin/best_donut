package com.example.demo.users.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.users.CustomUsers;
import com.example.demo.users.UsersVO;
import com.example.demo.users.mapper.UsersMapper;
import com.example.demo.users.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService, UserDetailsService {

	@Autowired UsersMapper usersMapper;

	@Override
	public List<UsersVO> getUsers(UsersVO vo) {
		return usersMapper.getUsers(vo);
	}

	@Override
	public int insertUsers(UsersVO vo) {
		return usersMapper.insertUsers(vo);
	}

	@Override
	public UsersVO getUsersInfo(String usersCode) {
		return usersMapper.getUsersInfo(usersCode);
	}

	@Override
	@Transactional
	public int updateUsers(UsersVO vo) {
		usersMapper.deletePerm(vo.getUsersCode());
		usersMapper.insertPerm(vo);
		return usersMapper.updateUsers(vo);
	}

	@Override
	@Transactional
	public int deleteUsers(String usersCode) {
		usersMapper.deletePerm(usersCode);
		return usersMapper.deleteUsers(usersCode);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UsersVO userVO = usersMapper.getUsersInfo(username);
		List<String> perm = usersMapper.getPerm(username);
		if(userVO == null) {
			throw new UsernameNotFoundException("id not found");
		}
		return new CustomUsers(userVO, perm);
	}
	
}
