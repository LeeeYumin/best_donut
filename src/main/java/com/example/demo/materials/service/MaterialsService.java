package com.example.demo.materials.service;

import java.util.List;

import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.MaterialWarehousingVO;

public interface MaterialsService {
	// 자재 재고 목록 관리
	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);
	
	public int updateMatStatus(String[] matLotCodes);

	// 자재 발주 등록
	public boolean insertMatOrders(MaterialOrderVO vo);
	
	// 자재 발주 관리
	public List<MaterialOrderVO> getMaterialOrders(MaterialOrderVO vo);
	
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String[] matOrderCodes);

	// 발주 취소 못하는 상태로 상태 변경
	public void updateMatOrderStatus();
	
	public int updateMatOrderCancel(String[] matOrderCodes);
	
	// 자재 입고 등록
	public List<MaterialWarehousingVO> getWarehousingList(MaterialWarehousingVO vo);
}
