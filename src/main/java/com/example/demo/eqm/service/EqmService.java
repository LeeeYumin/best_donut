package com.example.demo.eqm.service;

import java.util.List;

import com.example.demo.eqm.EqmVO;

public interface EqmService {
	
	public List<EqmVO> getEqm(EqmVO vo);
	public int insertEqm(EqmVO vo);
	public EqmVO getEqmInfo(String eqmCode);
	public int updateEqm(EqmVO vo);
	public int deleteEqm(String eqmCode);
	
}
