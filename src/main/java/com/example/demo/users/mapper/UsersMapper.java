package com.example.demo.users.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.users.UsersVO;

@Mapper
public interface UsersMapper {
	
	public List<UsersVO> getUsers(UsersVO vo);
	public int insertUsers(UsersVO vo);
	public UsersVO getUsersInfo(String usersCode);
	
	public int updateUsers(UsersVO vo);
	public int insertPerm(UsersVO vo);
	
	public int deleteUsers(String usersCode);
	public int deletePerm(String usersCode);
	
	public List<String> getPerm(String usersCode);
	
}
