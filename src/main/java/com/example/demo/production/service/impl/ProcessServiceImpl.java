package com.example.demo.production.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.production.ProdInsVO;
import com.example.demo.production.mapper.ProcessMapper;
import com.example.demo.production.service.ProcessService;

@Service
public class ProcessServiceImpl implements ProcessService {
	
	@Autowired ProcessMapper processMapper;

	
/* < 당일 생산지시 > */
	@Override
	public Map<String,Object> getTodayIns() {
		Map<String,Object> map = new HashMap<>();
		List<ProdInsVO> list = processMapper.getTodayIns();
		
		//지시
		map.put("prodIns", list);
		
		//지시상세
		if(list != null && list.size() > 0) {
			map.put("prodInsDe", processMapper.getTodayInsDetail(list.get(0).getProdInstructCode()));
			
		}
		return map;
	}















}
