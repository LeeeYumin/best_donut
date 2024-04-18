package com.example.demo.production.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.production.ProcessVO;
import com.example.demo.production.ProdInsDeVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanBVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;


@Mapper
public interface ProcessMapper {

/* 1.당일 생산지시 */
	public List<ProdInsVO> getTodayIns(); //당일 생산지시
	public List<ProdInsDeVO> getTodayInsDetail(String prodInstructCode); //당일 생산지시 상세
	public String getInsDeStatus(String prodInsDetailCode); //생산지시 상세 진행정보(함수호출)

/* 2.공정 */
	//1)조회
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode);
	public List<ProcessVO> getProcMatInfo(String procDetailCode);
	public List<ProcessVO> getProcEqmInfo();
	public List<ProcessVO> getEqmAllInfo(String eqmName);
	
	//2)수정
	public int updateProc(ProcessVO vo); //공정update프로시저
	public int updateProcEqm(ProcessVO vo); //공정사용 설비 변경
	
	
/* 3.공정실적 */
	public List<ProdInsVO> getProcResultList(ProdInsVO vo); //완료된 공정(생산지시) 목록
	public List<ProdInsDeVO> getProcResultDeList(String prodInstructCode); //완료된 생산지시 상세
	

}
