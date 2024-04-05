package com.example.demo.notOpr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.notOpr.NotOprVO;
import com.example.demo.notOpr.mapper.NotOprMapper;
import com.example.demo.notOpr.service.NotOprService;

@Service
public class NotOprServiceImpl implements NotOprService{

	@Autowired NotOprMapper notOprmapper;
	
	@Override
	public List<NotOprVO> getNotOpr(NotOprVO vo) {
		return notOprmapper.getNotOpr(vo);
	}

}
