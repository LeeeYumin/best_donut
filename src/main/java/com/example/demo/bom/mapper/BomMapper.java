package com.example.demo.bom.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.bom.BomVO;

@Mapper
public interface BomMapper {
	public List<BomVO> getMatOrdersBom();
	public List<BomVO> getMatOutBom(String productCode);
	
	public List<BomVO> getProdBom();
	public List<BomVO> getListBom();
	public List<BomVO> bomselList();
}
