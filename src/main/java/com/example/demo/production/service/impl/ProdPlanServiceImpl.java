package com.example.demo.production.service.impl;

import java.util.List;

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
	public List<ProdPlanVO> getProdReq() {
		return prodPlanMapper.getProdReq();
	}
	
	@Override
	public List<ProdPlanVO> getProdReqDetail() {
		return prodPlanMapper.getProdReqDetail();
	}
	


}
