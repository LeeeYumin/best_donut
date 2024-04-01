package com.example.demo.materials.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MaterialsMapper {
	public List<Map<String, Object>> getMaterials();
}
