package com.example.demo.materials.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.materials.MaterialOrderDetailVO;
import com.example.demo.materials.MaterialOrderlVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;

@Mapper
public interface MaterialsMapper {
	// 자재 재고 관리
	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);
	
	// 자재 발주 관리
	public List<MaterialOrderlVO> getMaterialOrders();
	
	public List<MaterialOrderDetailVO> getMaterialOrderDetail(String matOrdersCode);
}
