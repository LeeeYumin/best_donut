package com.example.demo.production.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanBVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;


@Mapper
public interface ProdPlanMapper {

	//1.생산요청
	public List<ProdPlanBVO> getProdReq();
	public List<ProdPlanBVO> getProdReqDetail(String prodReqCode);
	
	
	//2.생산계획
	//1)조회
	public List<ProdPlanVO> getProdPlan();
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode);
	
	//2)등록
	public int insertProdPlan(ProdPlanVO vo); //1건에
	public int insertProdPlanDetail(ProdPlanDeVO dvo); //여러 건

}
