package com.example.demo.production.service;

import java.util.List;
import java.util.Map;

import com.example.demo.production.ProcessVO;


public interface ProcessService {

/* 1.당일 생산지시&상세 */
	public Map<String,Object> getTodayIns();

/* 2.공정 */
	//1)조회
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode);
	public List<ProcessVO> getProcMatInfo(String procDetailCode);
	public List<ProcessVO> getProcEqmInfo(); //사용되는 설비 가동현황
	
	//2)수정
//	public int updateBeginTime(ProcessVO vo);
//	public int updateEndTime(ProcessVO vo);
	public int updateProc(ProcessVO vo);

	

	
	
}
