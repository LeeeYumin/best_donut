package com.example.demo.materials.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.MaterialWarehousingVO;
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

	@Override
	public int updateMatStatus(String[] matLotCodes) {
		return materialsMapper.updateMatStatus(matLotCodes);
	}

	// 자재 발주 등록 + 발주 상세 등록
	@Override
	public boolean insertMatOrders(MaterialOrderVO vo) {
		materialsMapper.insertMatOrders(vo);
		
		int result = 0;
		for(int i = 0; i < vo.getMatOrderDetailVO().size(); i++) {
			MaterialOrderDetailVO dvo = vo.getMatOrderDetailVO().get(i);
			
			dvo.setMatOrdersCode(vo.getMatOrdersCode());
			result += materialsMapper.insertMatOrdersDetail(dvo);
		}
		
		return result >= 1 ? true : false;
	}
	
	// 자재 발주 관리
	@Override
	public List<MaterialOrderVO> getMaterialOrders(MaterialOrderVO vo) {
		return materialsMapper.getMaterialOrders(vo);
	}

	@Override
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String[] matOrderCodes) {
		return materialsMapper.getMaterialOrderDetail(matOrderCodes);
	}

	@Override
	public int updateMatOrderStatus() {
		return materialsMapper.updateMatOrderStatus();
	}

	@Override
	public int updateMatOrdersDetailStatus() {
		return materialsMapper.updateMatOrdersDetailStatus();
	}

	@Override
	public int updateMatOrderCancel(String[] matOrderCodes) {
		return materialsMapper.updateMatOrderCancel(matOrderCodes);
	}

	@Override
	public List<MaterialWarehousingVO> getWarehousingList() {
		return materialsMapper.getWarehousingList();
	}
}
