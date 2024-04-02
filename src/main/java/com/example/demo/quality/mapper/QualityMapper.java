package com.example.demo.quality.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.quality.QualityVO;

@Mapper
public interface QualityMapper {

	public List<QualityVO> insertMatQuality();
	public List<Map<String, Object>> getMatInfo();
}
