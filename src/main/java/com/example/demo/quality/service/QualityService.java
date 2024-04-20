package com.example.demo.quality.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.example.demo.product.ProductInoutVO;
import com.example.demo.quality.AdminMatQualVO;
import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
import com.example.demo.quality.QualityUnfitVO;
import com.example.demo.quality.QualityVO;

public interface QualityService {

	public boolean insertMatQuality(List<MatQltyCheckVO> vo);
	public List<Map<String, Object>> getMatInfo(MatQltyCheckVO vo); //LOT,등록날짜 검색
	public List<AdminMatQualVO> adminMatQuality(AdminMatQualVO vo); //자재코드, 입고날짜 검색
	public List<ProDetailVO> selectProQuality(String allEndTime); //grid1
	public boolean insertProQual(List<ProQltyVO> vo); //완제품품질입력(grid2)
	public List<Map<String, Object>> selectProQual();
	//public boolean addProQual(int goodCnt, String productLotCode);
	public List<ProQltyVO> adminProQuality(String productName, String checkRecvDate); //완제품품질관리
	public List<QualityUnfitVO> getUnfitProd(); //완제품 불량등록

}
