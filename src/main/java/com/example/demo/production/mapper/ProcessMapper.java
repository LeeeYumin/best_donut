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
	public List<ProdInsVO> getTodayIns();
	public List<ProdInsDeVO> getTodayInsDetail(String prodInstructCode);

/* 2.공정 */
	//1)조회
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode);
	public List<ProcessVO> getProcMatInfo(String procDetailCode);
	public List<ProcessVO> getProcEqmInfo();
	//2)수정 - 공정시작
	//	    - 공정종료
	//      - 설비 가동중으로 변경
	public int updateProc(ProcessVO vo);
	
//	public int updateBeginTime(ProcessVO vo);
//	public int updateEndTime(ProcessVO vo);
//	public int updateOprStatus(ProcessVO vo); //beginTime update할 땐 FO2 가동중 | endTime F01 대기
	


	

}
