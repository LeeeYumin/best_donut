package com.example.demo.production.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.production.ProdPlanVO;
import com.example.demo.production.mapper.ProdPlanMapper;
import com.example.demo.production.service.ProdPlanService;


@Service
public class ProdPlanServiceImpl implements ProdPlanService {
	
	@Autowired ProdPlanMapper prodPlanMapper;

	
	//생산요청
	@Override
	public Map<String,Object> getProdReq() {
		Map<String,Object> map = new HashMap<>();
		List<ProdPlanVO> list = prodPlanMapper.getProdReq();
		
		//요청
		map.put("prodReq", list);
		
		//요청상세
		if(list != null && list.size() > 0) {
			map.put("prodReqDe", prodPlanMapper.getProdReqDetail(list.get(0).getProdReqCode()));
		}
		return map;
	}



}
