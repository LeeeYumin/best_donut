package com.example.demo.production.service;

import java.util.List;
import java.util.Map;

import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanVO;

public interface ProdPlanService {

	//생산요청&상세
	public Map<String,Object> getProdReq();
	
	//생산계획목록
	public List<ProdPlanVO> getProdPlan();
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode);
	
}
