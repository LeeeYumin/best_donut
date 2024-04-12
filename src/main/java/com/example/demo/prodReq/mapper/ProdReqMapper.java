package com.example.demo.prodReq.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.prodReq.ProdReqDetailVO;
import com.example.demo.prodReq.ProdReqVO;

@Mapper
public interface ProdReqMapper {

	// 1. 생산요청조회
	public List<ProdReqVO> getProdReq(ProdReqVO vo);					// 생산요청조회
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode);		// 생산요청상세조회
	
	// 2. 생산요청등록
	public int insertProdReq(ProdReqVO vo);								// 생산요청등록
	public int insertProdReqDet(ProdReqDetailVO vo);					// 생산요청상세등록
	public int updateOrdStat(ProdReqVO VO);		// 주문상태변경
}
