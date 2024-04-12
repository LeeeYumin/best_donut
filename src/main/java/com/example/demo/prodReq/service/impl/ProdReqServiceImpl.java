package com.example.demo.prodReq.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.prodReq.ProdReqDetailVO;
import com.example.demo.prodReq.ProdReqVO;
import com.example.demo.prodReq.mapper.ProdReqMapper;
import com.example.demo.prodReq.service.ProdReqService;

@Service
public class ProdReqServiceImpl implements ProdReqService{

	@Autowired ProdReqMapper prodReqMapper;
	
	// 1 .생산요청 조회
	@Override
	public List<ProdReqVO> getProdReq(ProdReqVO vo) {
		return prodReqMapper.getProdReq(vo);
	}
	
	// 생산요청 상세조회
	@Override
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode) {
		return prodReqMapper.getProdReqDet(prodReqCode);
	}
	
	
	// 2. 생산요청등록

	// 생산요청등록 + 생산요청상세등록 + 주문상태변경
	@Override
	public boolean insertProdReq(ProdReqVO vo) {
		prodReqMapper.insertProdReq(vo);
		
		int result = 0;
		for(int i = 0; i < vo.getProdReqDetList().size(); i++) {
			ProdReqDetailVO dvo = vo.getProdReqDetList().get(i);
			
			dvo.setProdReqCode(vo.getProdReqCode());
			result += prodReqMapper.insertProdReqDet(dvo);
		}
		
		prodReqMapper.updateOrdStat(vo);
		
		return result >= 1 ? true : false;
	}
}
