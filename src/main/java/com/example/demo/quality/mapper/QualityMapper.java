package com.example.demo.quality.mapper;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
import com.example.demo.quality.QualityVO;

@Mapper
public interface QualityMapper {

	public int insertMatQuality(MatQltyCheckVO vo);
	public List<Map<String, Object>> getMatInfo(String matLotCode, String inoutDate); //LOT,등록날짜 검색
	public List<Map<String, Object>> adminMatQuality(String matCode, String inoutDate); //자재코드, 입고날짜 select 
	public int addMatQual(MatQltyCheckVO vo); 
	public int addMatQual2(MatQltyCheckVO vo); 
	public List<ProDetailVO> selectProQuality(); //완제품품질등록(조회. grid1)
	public List<ProQltyVO> insertProQual(); //완제품품질입력(grid2)
	public List<Map<String, Object>> selectProQual();
	public int addProQual(ProDetailVO pvo); 
	

}
