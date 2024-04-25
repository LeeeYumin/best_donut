package com.example.demo.materials.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.materials.MaterialInOutVO;
import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderVO;
import com.example.demo.materials.MaterialOutgoingVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.MaterialWarehousingVO;

@Mapper
public interface MaterialsMapper {
	// 자재 재고 관리
	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);
	
	public int updateMatStatus(String[] matLotCodes);
	
	// 자재 발주 등록
	public int insertMatOrders(MaterialOrderVO vo);

	public int insertMatOrdersDetail(MaterialOrderDetailVO vo);
	
	// 자재 발주 관리
	public List<MaterialOrderVO> getMaterialOrders(MaterialOrderVO vo);
	
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String[] matOrderCodes);
	
	// 발주 취소 못하는 상태로 상태 변경
	public void updateMatOrderStatus();

	public int updateMatOrderCancel(String[] matOrderCodes);
	
	// 자재 입고 등록
	public List<MaterialWarehousingVO> getWarehousingList(MaterialWarehousingVO vo);
	
	public int insertMatWarehousing(MaterialWarehousingVO vo);
	
	// 자재 불출 등록
	public int insertMatOutgoing(MaterialOutgoingVO vo);
	
	// 자재 입출고 목록
	public List<MaterialInOutVO> getMatInOutList(MaterialInOutVO vo);
}
