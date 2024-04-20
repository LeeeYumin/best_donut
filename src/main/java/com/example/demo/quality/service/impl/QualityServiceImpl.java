package com.example.demo.quality.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.quality.AdminMatQualVO;
import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
import com.example.demo.quality.QualityUnfitVO;
import com.example.demo.quality.QualityVO;
import com.example.demo.quality.mapper.QualityMapper;
import com.example.demo.quality.service.QualityService;

@Service
public class QualityServiceImpl implements QualityService {

	@Autowired
	QualityMapper qualityMapper;
	
	@Override
	public boolean insertMatQuality(List<MatQltyCheckVO> list) {
		
		int check = 0;
		for(MatQltyCheckVO vo : list) {		
			check += qualityMapper.insertMatQuality(vo);			
			//등록 클릭하면 재고 수량에 update
			check += qualityMapper.addMatQual3(vo);
			qualityMapper.addMatQual(vo);
		}
		return check > 0 ? true : false;
	}
	
	@Override
	public List<Map<String, Object>> getMatInfo(MatQltyCheckVO vo) {
		return qualityMapper.getMatInfo(vo); //자재품질등록
	}

	@Override
	public List<AdminMatQualVO> adminMatQuality(AdminMatQualVO vo) {
		return qualityMapper.adminMatQuality(vo); //자재품질관리
	}
	
	@Override
	public List<ProDetailVO> selectProQuality(String allEndTime){
		return qualityMapper.selectProQuality(allEndTime); //grid1 완제품품질등록 
	}

	@Override
	public boolean insertProQual(List<ProQltyVO> list) {
		int result = 0;
		
		for(ProQltyVO vo : list) {
			result += qualityMapper.insertProQual(vo);
			result += qualityMapper.addProQual(vo);
			result += qualityMapper.addProQual2(vo.getProductCode());
			result += qualityMapper.insertProdInout(vo);
		}
		return result > 0 ? true : false; //grid2 완제품품질입력
	}

	@Override
	public List<Map<String, Object>> selectProQual() {
		return qualityMapper.selectProQual();
	}

	@Override
	public List<ProQltyVO> adminProQuality(String productName, String checkRecvDate) {	
		return qualityMapper.adminProQuality(productName, checkRecvDate);
	}

	@Override
	public List<QualityUnfitVO> getUnfitProd() {
		return qualityMapper.getUnfitProd();
	}


//	@Override
//	public boolean addProQual(int goodCnt, String productLotCode) {
//		return qualityMapper.addProQual(goodCnt, productLotCode);
//	}






}
