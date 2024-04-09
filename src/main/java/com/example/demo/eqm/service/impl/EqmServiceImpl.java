package com.example.demo.eqm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.eqm.EqmVO;
import com.example.demo.eqm.mapper.EqmMapper;
import com.example.demo.eqm.service.EqmService;

@Service
public class EqmServiceImpl implements EqmService{
	
	@Autowired EqmMapper eqmMapper;

	@Override
	public List<EqmVO> getEqm(EqmVO vo) {
		return eqmMapper.getEqm(vo);
	}

	@Override
	public int insertEqm(EqmVO vo) {
		return eqmMapper.insertEqm(vo);
	}
	
	
}
