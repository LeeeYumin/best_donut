package com.example.demo.production.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.production.ProdPlanVO;

@Mapper
public interface ProdPlanMapper {

	// 생산요청
	public List<ProdPlanVO> getProdReq();
	public List<ProdPlanVO> getProdReqDetail(String prodReqCode);

}
