package com.example.demo.production.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanBVO;
import com.example.demo.production.ProdPlanDeVO;
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
		List<ProdPlanBVO> list = prodPlanMapper.getProdReq();
		
		//요청
		map.put("prodReq", list);
		
		//요청상세
		if(list != null && list.size() > 0) {
			map.put("prodReqDe", prodPlanMapper.getProdReqDetail(list.get(0).getProdReqCode()));
		}
		return map;
	}


	//생산계획
	@Override
	public List<ProdPlanVO> getProdPlan(ProdPlanVO vo) {
		return prodPlanMapper.getProdPlan(vo);
	}
	@Override
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode) {
		return prodPlanMapper.getProdPlanAll(prodPlanCode);
	}


	//등록
	@Override
	@Transactional
	public int insertProdPlan(ProdPlanVO vo) {
		//생산계획
		prodPlanMapper.insertProdPlan(vo);
		//생산요청상태 update
		prodPlanMapper.updateProdReqStatus(vo);
		
		//생산계획상세
		int result = 0;
		for(int i = 0; i < vo.getDvo().size(); i++) {
			ProdPlanDeVO devo = vo.getDvo().get(i);
			
			devo.setProdPlanCode(vo.getProdPlanCode()); //생산계획코드
			result = prodPlanMapper.insertProdPlanDetail(devo);
		}
		
		return result;
	}







}
