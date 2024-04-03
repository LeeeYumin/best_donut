package com.example.demo.materials.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import com.example.demo.materials.MaterialOrderReadVO;
=======
import com.example.demo.materials.MaterialOrderVO;
>>>>>>> 59a1ab41afa69351dcef86b436a8f4f5ed8d7682
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

<<<<<<< HEAD
	// 자재 발주 관리
	@Override
	public List<MaterialOrderReadVO> getMaterialOrders() {
=======
	@Override
	public List<MaterialOrderVO> getMaterialOrders() {
>>>>>>> 59a1ab41afa69351dcef86b436a8f4f5ed8d7682
		return materialsMapper.getMaterialOrders();
	}

}
