package com.example.demo.prodReq.service;

import java.util.List;

import com.example.demo.prodReq.ProdReqDetailVO;
import com.example.demo.prodReq.ProdReqVO;

public interface ProdReqService {

	// 1. 생산요청조회
	public List<ProdReqVO> getProdReq(ProdReqVO vo);					// 생산요청조회
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode);		// 생산요청상세조회
	
	// 2. 생산요청등록
	public boolean insertProdReq(ProdReqVO vo);
}
