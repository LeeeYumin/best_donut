package com.example.demo.materials.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderlVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.mapper.MaterialsMapper;
import com.example.demo.materials.service.MaterialsService;

@Service
public class MaterialsServiceImpl implements MaterialsService {

	@Autowired
	MaterialsMapper materialsMapper;

	// 자재 재고 목록 관리
	@Override
	public List<MaterialVO> getMaterials(String matName) {
		return materialsMapper.getMaterials(matName);
	}

	@Override
	public List<MaterialReadVO> getMaterialDetails(String matCode) {
		return materialsMapper.getMaterialDetails(matCode);
	}

	// 자재 발주 관리
	@Override
	public List<MaterialOrderlVO> getMaterialOrders() {
		return materialsMapper.getMaterialOrders();
	}

	@Override
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String matOrdersCode) {
		return materialsMapper.getMaterialOrderDetail(matOrdersCode);
	}

}
