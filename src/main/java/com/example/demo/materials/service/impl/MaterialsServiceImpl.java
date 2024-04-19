package com.example.demo.materials.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.materials.MaterialInOutVO;
import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderVO;
import com.example.demo.materials.MaterialOutgoingVO;
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
	public int insertMatOrders(MaterialOrderVO vo) {

		Map<String, List<MaterialOrderDetailVO>> map = new HashMap<>();
		List<MaterialOrderDetailVO> list = vo.getMatOrderDetailVO();
		
		for (int i = 0; i < list.size(); i++) {
			List<MaterialOrderDetailVO> orderList = map.get(list.get(i).getMainCompanyCode());
			// 같은 거래처 찾기
			if (orderList == null) {
				// list 생성
				orderList = new ArrayList<MaterialOrderDetailVO>();
				map.put(list.get(i).getMainCompanyCode(), orderList);
			}
			// 발주 내역 add
			orderList.add(list.get(i));
		}

		int result = 0;

		// 거래처 수만큼 반복
		for (String key : map.keySet()) {
			// 발주서 헤더
			vo.setCompanyCode(key);
			materialsMapper.insertMatOrders(vo);

			List<MaterialOrderDetailVO> dList = (List<MaterialOrderDetailVO>) map.get(key);
			for (int i = 0; i < dList.size(); i++) {
				MaterialOrderDetailVO dvo = dList.get(i);

				dvo.setMatOrdersCode(vo.getMatOrdersCode());
				result += materialsMapper.insertMatOrdersDetail(dvo);
			}
		}

		return result;
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

	// 발주 취소 못하는 상태로 상태 변경
	@Override
	public void updateMatOrderStatus() {
		materialsMapper.updateMatOrderStatus();
	}
	
	// 자재 발주 취소 기능
	@Override
	public int updateMatOrderCancel(String[] matOrderCodes) {
		return materialsMapper.updateMatOrderCancel(matOrderCodes);
	}

	// 자재 입고 예정 목록 조회
	@Override
	public List<MaterialWarehousingVO> getWarehousingList(MaterialWarehousingVO vo) {
		return materialsMapper.getWarehousingList(vo);
	}
	
	// 자재 입고 등록
	@Override
	public int insertMatWarehousing(List<MaterialWarehousingVO> list) {
		int result = 0;
		for(MaterialWarehousingVO vo:list) {
			vo.setWarehousingCnt(vo.getOrdersCnt());
			result += materialsMapper.insertMatWarehousing(vo);			
		}
		return result;
	}

	// 자재 불출 등록
	@Override
	public int insertMatOutgoing(List<MaterialOutgoingVO> list) {
		int result = 0;
		for(MaterialOutgoingVO vo : list) {
			vo.setOutCnt(vo.getProcNeedCnt());
			result += materialsMapper.insertMatOutgoing(vo);		
		}
		return result;
	}

	// 자재 입출고 목록
	@Override
	public List<MaterialInOutVO> getMatInOutList(MaterialInOutVO vo) {
		return materialsMapper.getMatInOutList(vo);
	}
}
