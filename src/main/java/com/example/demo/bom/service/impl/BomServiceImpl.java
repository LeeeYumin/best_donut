package com.example.demo.bom.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.bom.BomVO;
import com.example.demo.bom.mapper.BomMapper;
import com.example.demo.bom.service.BomService;

@Service
public class BomServiceImpl implements BomService {

	@Autowired BomMapper bomMapper;
	
	@Override
	public List<BomVO> getMatOrdersBom() {
		return bomMapper.getMatOrdersBom();
	}

	@Override
	public List<BomVO> getMatOutBom(String productCode) {
		return bomMapper.getMatOutBom(productCode);
	}

	@Override
	public List<BomVO> getProdBom() {
		return bomMapper.getProdBom();
	}

	@Override
	public List<BomVO> getListBom() {
		return bomMapper.getListBom();
	}

	@Override
	public List<BomVO> bomselList() {
		return bomMapper.bomselList();
	}




}
