package com.example.demo.notOpr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.eqm.EqmVO;
import com.example.demo.notOpr.NotOprVO;
import com.example.demo.notOpr.mapper.NotOprMapper;
import com.example.demo.notOpr.service.NotOprService;
import com.example.demo.users.UsersVO;

@Service
public class NotOprServiceImpl implements NotOprService{

	@Autowired NotOprMapper notOprmapper;
	
	@Override
	public List<NotOprVO> getNotOpr(NotOprVO vo) {
		return notOprmapper.getNotOpr(vo);
	}

	@Override
	public int insertNotOpr(NotOprVO vo) {
		return notOprmapper.insertNotOpr(vo);
	}

	@Override
	public List<UsersVO> getUsers() {
		return notOprmapper.getUsers();
	}

	@Override
	public List<EqmVO> getEqm() {
		return notOprmapper.getEqm();
	}

	@Override
	public NotOprVO getNotOprInfo(String notOprCode) {
		return notOprmapper.getNotOprInfo(notOprCode);
	}

}
