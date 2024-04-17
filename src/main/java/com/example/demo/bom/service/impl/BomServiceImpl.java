package com.example.demo.bom.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.bom.BomVO;
import com.example.demo.bom.InsertBomVO;
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
	public List<BomVO> bomselList(String bomCode) {
		return bomMapper.bomselList(bomCode);
	}

	@Override
	public List<BomVO> selectBom() {
		return bomMapper.selectBom();
	}

	@Override
	public List<BomVO> selectBom2() {
		return bomMapper.selectBom2();
	}

	@Override
	public int insertNewBom(InsertBomVO vo) {
		int result = 0;
		
		bomMapper.insertNewBom(vo);
		String bomCode = vo.getBomCode();
		
		List<BomVO> list = vo.getPick();
		for(BomVO bvo : list) {
			bvo.setBomCode(bomCode);
			result += bomMapper.insertNewBom2(bvo);
		}
		
		return result;
	}

	



}
