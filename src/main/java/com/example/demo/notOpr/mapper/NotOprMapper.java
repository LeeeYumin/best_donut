package com.example.demo.notOpr.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.eqm.EqmVO;
import com.example.demo.notOpr.NotOprVO;
import com.example.demo.users.UsersVO;

@Mapper
public interface NotOprMapper {

	public List<NotOprVO> getNotOpr(NotOprVO vo);
	public int insertNotOpr(NotOprVO vo);
	public NotOprVO getNotOprInfo(String notOprCode);
	public int updateNotOpr(NotOprVO vo);
	public int deleteNotOpr(String notOprCode);
	
	public List<UsersVO> getUsers();
	public List<EqmVO> getEqm();
	
}
