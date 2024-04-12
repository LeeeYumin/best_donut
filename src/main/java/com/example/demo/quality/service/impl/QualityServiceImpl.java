package com.example.demo.quality.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
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
		}
		return check > 0 ? true : false;
	}
	
	@Override
	public List<Map<String, Object>> getMatInfo(String matLotCode, String inoutDate) {
		return qualityMapper.getMatInfo(matLotCode, inoutDate); //자재품질등록
	}

	@Override
	public List<Map<String, Object>> adminMatQuality(String matCode, String inoutDate) {
		return qualityMapper.adminMatQuality(matCode, inoutDate); //자재품질관리
	}

	@Override
	public List<ProDetailVO> selectProQuality(){
		return qualityMapper.selectProQuality(); //grid1 완제품품질등록 
	}

	@Override
	public List<ProQltyVO> insertProQual() {
		return qualityMapper.insertProQual(); //grid2 완제품품질입력
	}

	@Override
	public List<Map<String, Object>> selectProQual() {
		return qualityMapper.selectProQual();
	}

	@Override
	public boolean addProQual(ProDetailVO pvo) {
		return qualityMapper.addProQual(pvo);
	}






}
