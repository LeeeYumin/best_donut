package com.example.demo.users.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.users.UsersVO;

@Mapper
public interface UsersMapper {
	
	public List<UsersVO> getUsers(UsersVO vo);
	
}
