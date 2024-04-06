package com.example.demo.production.service;

import java.util.List;
import java.util.Map;

import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;

public interface ProdPlanService {

	//1.생산요청&상세
	public Map<String,Object> getProdReq();
	
	
	//2.생산계획
	//1)조회
	public List<ProdPlanVO> getProdPlan();
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode);
	
	//2)등록
	public int insertProdPlan(ProdPlanVO vo);
	//+상태수정
	//public int updateProdReqStatus(String prodPlanCode);
	
	
}
