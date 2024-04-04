package com.example.demo.quality.service;

import java.util.List;
import java.util.Map;

import com.example.demo.quality.QualityVO;

public interface QualityService {

	public List<QualityVO> insertMatQuality();
	public List<Map<String, Object>> getMatInfo(String matLotCode, String inoutDate); //LOT,등록날짜 검색
	public List<Map<String, Object>> adminMatQuality(String matCode, String inoutDate); //자재코드, 입고날짜 검색
}
