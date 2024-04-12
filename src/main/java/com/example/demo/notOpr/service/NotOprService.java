package com.example.demo.notOpr.service;

import java.util.List;

import com.example.demo.eqm.EqmVO;
import com.example.demo.notOpr.NotOprVO;
import com.example.demo.users.UsersVO;

public interface NotOprService {

	public List<NotOprVO> getNotOpr(NotOprVO vo);
	public int insertNotOpr(NotOprVO vo);
	
	public List<UsersVO> getUsers();
	public List<EqmVO> getEqm();
	
	public NotOprVO getNotOprInfo(String notOprCode);
	
}
