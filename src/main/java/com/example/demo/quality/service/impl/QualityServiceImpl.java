package com.example.demo.quality.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.quality.QualityVO;
import com.example.demo.quality.mapper.QualityMapper;
import com.example.demo.quality.service.QualityService;

@Service
public class QualityServiceImpl implements QualityService {

	@Autowired
	QualityMapper qualityMapper;
	
	@Override
	public List<QualityVO> insertMatQuality() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getMatInfo(String matLotCode, String inoutDate) {
		return qualityMapper.getMatInfo(matLotCode, inoutDate);
	}


}
