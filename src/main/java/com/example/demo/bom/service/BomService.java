package com.example.demo.bom.service;

import java.util.List;

import com.example.demo.bom.BomVO;

public interface BomService {
	public List<BomVO> getMatOrdersBom();
	public List<BomVO> getMatOutBom(String productCode);
	
	public List<BomVO> getProdBom();
	public List<BomVO> getListBom();
	public List<BomVO> bomselList();
	
}
