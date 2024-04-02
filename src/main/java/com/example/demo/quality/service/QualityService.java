package com.example.demo.quality.service;

import java.util.List;
import java.util.Map;

import com.example.demo.quality.QualityVO;

public interface QualityService {

	public List<QualityVO> insertMatQuality();
	public List<Map<String, Object>> getMatInfo();
}
