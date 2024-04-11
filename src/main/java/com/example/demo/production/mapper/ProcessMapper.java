package com.example.demo.production.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.production.ProdInsDeVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanBVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;


@Mapper
public interface ProcessMapper {

/* 1.당일 생산지시 */
	public List<ProdInsVO> getTodayIns();
	public List<ProdInsDeVO> getTodayInsDetail(String prodInstructCode);

	

}
