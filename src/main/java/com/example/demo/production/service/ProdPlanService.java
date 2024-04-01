package com.example.demo.production.service;

import java.util.List;

import com.example.demo.production.ProdPlanVO;

public interface ProdPlanService {

	//생산요청
	public List<ProdPlanVO> getProdReq();
	public List<ProdPlanVO> getProdReqDetail();
	
}
