package com.example.demo.eqm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.eqm.EqmVO;
import com.example.demo.eqm.FileVO;
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

	@Override
	public EqmVO getEqmInfo(String eqmCode) {
		return eqmMapper.getEqmInfo(eqmCode);
	}

	@Override
	public int updateEqm(EqmVO vo) {
		return eqmMapper.updateEqm(vo);
	}

	@Override
	public int deleteEqm(String eqmCode) {
		return eqmMapper.deleteEqm(eqmCode);
	}

	@Override
	public int insertImage(FileVO fvo) {
		return eqmMapper.insertImage(fvo);
	}
	
	
}
