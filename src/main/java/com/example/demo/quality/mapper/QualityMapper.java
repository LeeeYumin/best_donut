package com.example.demo.quality.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.product.ProductInoutVO;
import com.example.demo.quality.AdminMatQualVO;
import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
import com.example.demo.quality.QualityUnfitVO;
import com.example.demo.quality.QualityVO;

@Mapper
public interface QualityMapper {

	public int insertMatQuality(MatQltyCheckVO vo);
	public List<Map<String, Object>> getMatInfo(MatQltyCheckVO vo); //LOT,등록날짜 검색
	public int addMatQual(MatQltyCheckVO vo);//자재 재고 업데이트
	public List<AdminMatQualVO> adminMatQuality(AdminMatQualVO vo); //자재코드, 입고날짜 select 
	public int addMatQual3(MatQltyCheckVO vo); //lot 업데이트
	public List<ProDetailVO> selectProQuality(String allEndTime); //완제품품질등록(조회. grid1)
	public int insertProQual(ProQltyVO vo); //완제품품질입력(grid2)
	public List<Map<String, Object>> selectProQual();
	public int addProQual(ProQltyVO vo);
	public List<ProQltyVO> adminProQuality(String productName, String checkRecvDate); //완제품품질관리
	public List<QualityUnfitVO> getUnfitProd(); //완제품 불량등록
	public int addProQual2(String productCode);
	public int insertProdInout(ProQltyVO vo); //inout history 입출고내역 등록
}
