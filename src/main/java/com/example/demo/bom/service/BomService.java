package com.example.demo.bom.service;

import java.util.List;

import com.example.demo.bom.BomVO;
import com.example.demo.bom.InsertBomVO;

public interface BomService {
	public List<BomVO> getMatOrdersBom();
	public List<BomVO> getMatOutBom(String productCode);
	
	public List<BomVO> getProdBom();
	public List<BomVO> getListBom();
	public List<BomVO> bomselList(String bomCode); //grid2에 출력
	
	public List<BomVO> selectBom();
	public List<BomVO> selectBom2();
	public int insertNewBom(InsertBomVO vo);
	
}
