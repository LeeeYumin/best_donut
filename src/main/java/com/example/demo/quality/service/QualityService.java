package com.example.demo.quality.service;

import java.util.List;
import java.util.Map;

import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
import com.example.demo.quality.QualityVO;

public interface QualityService {

	public boolean insertMatQuality(List<MatQltyCheckVO> vo);
	public List<Map<String, Object>> getMatInfo(String matLotCode, String inoutDate); //LOT,등록날짜 검색
	public List<Map<String, Object>> adminMatQuality(String matCode, String inoutDate); //자재코드, 입고날짜 검색
	public List<ProDetailVO> selectProQuality(); //grid1
	public List<ProQltyVO> insertProQual(); //완제품품질입력(grid2)
	public List<Map<String, Object>> selectProQual();
	public int addProQual(ProDetailVO pvo); 
	
}
