package com.example.demo.materials.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;

@Mapper
public interface MaterialsMapper {
	public List<MaterialVO> getMaterials(String matName);

	public List<MaterialReadVO> getMaterialDetails(String matCode);
}
