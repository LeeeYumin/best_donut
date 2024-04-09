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

}
