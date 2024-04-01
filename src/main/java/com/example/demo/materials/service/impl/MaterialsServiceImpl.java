package com.example.demo.materials.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.materials.mapper.MaterialsMapper;
import com.example.demo.materials.service.MaterialsService;

@Service
public class MaterialsServiceImpl implements MaterialsService{

	@Autowired MaterialsMapper materialsMapper;
	
	@Override
	public List<Map<String, Object>> getMaterials() {
		return materialsMapper.getMaterials();
	}

	
}
