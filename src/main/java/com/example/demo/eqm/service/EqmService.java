package com.example.demo.eqm.service;

import java.util.List;

import com.example.demo.eqm.EqmVO;
import com.example.demo.eqm.FileVO;

public interface EqmService {
	
	public List<EqmVO> getEqm(EqmVO vo);
	public int insertEqm(EqmVO vo);
	public int insertImage(FileVO fvo);
	public EqmVO getEqmInfo(String eqmCode);
	public int updateEqm(EqmVO vo);
	public int deleteEqm(String eqmCode);
	
}
