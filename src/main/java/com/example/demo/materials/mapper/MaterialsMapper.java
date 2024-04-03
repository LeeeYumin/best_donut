package com.example.demo.materials.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

<<<<<<< HEAD
import com.example.demo.materials.MaterialOrderReadVO;
=======
import com.example.demo.materials.MaterialOrderVO;
>>>>>>> 59a1ab41afa69351dcef86b436a8f4f5ed8d7682
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;

@Mapper
public interface MaterialsMapper {
<<<<<<< HEAD
	// 자재 재고 목록 관리
=======
	// 자재 재고 관리
>>>>>>> 59a1ab41afa69351dcef86b436a8f4f5ed8d7682
	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);
	
	// 자재 발주 관리
<<<<<<< HEAD
	public List<MaterialOrderReadVO> getMaterialOrders();
=======
	public List<MaterialOrderVO> getMaterialOrders();
>>>>>>> 59a1ab41afa69351dcef86b436a8f4f5ed8d7682
}
