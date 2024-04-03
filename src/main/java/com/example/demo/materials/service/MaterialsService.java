package com.example.demo.materials.service;

import java.util.List;

import com.example.demo.materials.MaterialOrderReadVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;

public interface MaterialsService {
		// 자재 재고 목록 관리
		public List<MaterialVO> getMaterials(String matName);

		public List<MaterialReadVO> getMaterialDetails(String matCode);
		
		// 자재 발주 관리
		public List<MaterialOrderReadVO> getMaterialOrders();
}
