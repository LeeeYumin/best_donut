package com.example.demo.materials.service;

import java.util.List;

import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderlVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;

public interface MaterialsService {
	// 자재 재고 목록 관리
	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);
	
	public int updateMatStatus(String[] matLotCodes);

	// 자재 발주 관리
	public List<MaterialOrderlVO> getMaterialOrders(MaterialOrderlVO vo);
	
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String[] matOrderCodes);

}
