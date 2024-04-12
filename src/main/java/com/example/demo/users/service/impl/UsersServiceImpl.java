package com.example.demo.users.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.users.UsersVO;
import com.example.demo.users.mapper.UsersMapper;
import com.example.demo.users.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService{

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
	public int updateUsers(UsersVO vo) {
//		usersMapper.updateUsersPerm(vo);
		return usersMapper.updateUsers(vo);
	}

	@Override
	public int deleteUsers(String usersCode) {
		return usersMapper.deleteUsers(usersCode);
	}
	
}
