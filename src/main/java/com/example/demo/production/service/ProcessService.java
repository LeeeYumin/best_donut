package com.example.demo.production.service;

import java.util.List;
import java.util.Map;

import com.example.demo.production.ProcessVO;
import com.example.demo.production.ProdInsDeVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;


public interface ProcessService {

/* 1.당일 생산지시&상세 */
	public Map<String,Object> getTodayIns();

/* 2.공정 */
	//1)조회
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode);
	public List<ProcessVO> getProcMatInfo(String procDetailCode);
	public List<ProcessVO> getProcEqmInfo(); //사용되는 설비 가동현황
	public List<ProcessVO> getEqmAllInfo(String eqmName);
	
	//2)수정
	public int updateProc(ProcessVO vo);
	public int updateProcEqm(ProcessVO vo); //공정사용 설비 변경
	
/* 3.공정실적 */
	public List<ProdInsVO> getProcResultList(ProdInsVO vo); //완료된 생산지시 목록
	public List<ProdInsDeVO> getProcResultDeList(String prodInstructCode); //완료된 생산지시 상세
	
}
