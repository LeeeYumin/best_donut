package com.example.demo.users.service;

import java.util.List;

import com.example.demo.users.UsersVO;

public interface UsersService {
	
	public List<UsersVO> getUsers(UsersVO vo);
	public int insertUsers(UsersVO vo);

}
