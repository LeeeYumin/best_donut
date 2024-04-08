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
	public List<ProdPlanVO> getProdPlan(ProdPlanVO vo);
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode);
	
	//2)등록
	public int insertProdPlan(ProdPlanVO vo);
	
	//3)수정
	public int updateProdPlanDetail(List<ProdPlanDeVO> dvo); //updatedRows 배열
	
	//4)삭제
	public int deleteProdPlan(ProdPlanVO vo);
}
