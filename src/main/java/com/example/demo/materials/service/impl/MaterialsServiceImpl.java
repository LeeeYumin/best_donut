package com.example.demo.materials.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		
		Map<String,List<MaterialOrderDetailVO>> map = new HashMap<>();
		List<MaterialOrderDetailVO> list = vo.getMatOrderDetailVO();
		for(int i = 0; i < list.size(); i++) {
			List<MaterialOrderDetailVO> orderlist = map.get(list.get(i).getMainCompanyCode());
			// 같은 거래처 찾기
			if(orderlist ==null){
				// list 생성
				orderlist = new ArrayList<MaterialOrderDetailVO>();
				map.put(list.get(i).getMainCompanyCode(), orderlist);
			}			
			// 발주 내역 add
			orderlist.add(list.get(i));
		}
		
		// System.out.println(map);
		//materialsMapper.insertMatOrders(vo);
		
		int result = 0;
	
		// 거래처 수만큼 반복
		for ( String key : map.keySet() ) {
			// 발주서 헤더
			vo.setCompanyCode(key);
			materialsMapper.insertMatOrders(vo);
			
			List<MaterialOrderDetailVO> dlist = (List<MaterialOrderDetailVO>)map.get(key);
			for(int i = 0; i < dlist.size(); i++) {
				MaterialOrderDetailVO dvo = dlist.get(i);
				
				dvo.setMatOrdersCode(vo.getMatOrdersCode());
				result += materialsMapper.insertMatOrdersDetail(dvo);
			}
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

	// 발주 취소 못하는 상태로 상태 변경
	@Override
	public void updateMatOrderStatus() {
		materialsMapper.updateMatOrderStatus();
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
