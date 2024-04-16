package com.example.demo.production.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.production.ProcessVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.mapper.ProcessMapper;
import com.example.demo.production.service.ProcessService;

@Service
public class ProcessServiceImpl implements ProcessService {
	
	@Autowired ProcessMapper processMapper;

	
/* < 당일 생산지시 > */
	@Override
	public Map<String,Object> getTodayIns() {
		Map<String,Object> map = new HashMap<>();
		List<ProdInsVO> list = processMapper.getTodayIns();
		
		//지시
		map.put("prodIns", list);
		
		//지시상세
		if(list != null && list.size() > 0) {
			map.put("prodInsDe", processMapper.getTodayInsDetail(list.get(0).getProdInstructCode()));
			
		}
		return map;
	}

/* < 공정 > */
	//1)조회
	@Override
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode) { //공정진행
		return processMapper.getProcessInfo(prodInsDetailCode);
	}
	@Override
	public List<ProcessVO> getProcMatInfo(String procDetailCode) { //투입자재
		return processMapper.getProcMatInfo(procDetailCode);
	}
	@Override
	public List<ProcessVO> getProcEqmInfo() { //사용설비 가동상태
		return processMapper.getProcEqmInfo();
	}
	@Override
	public List<ProcessVO> getEqmAllInfo(String eqmName) { //공정별 모든 설비 정보 조회
		return processMapper.getEqmAllInfo(eqmName);
	}

	//2)수정
	@Override
	public int updateProc(ProcessVO vo) {
		return processMapper.updateProc(vo);
	}

	@Override
	public int updateProcEqm(ProcessVO vo) { //공정사용 설비 변경
		return processMapper.updateProcEqm(vo);
	}


	
//	@Override
//	public int updateBeginTime(ProcessVO vo) {
//		int result = 0;
//		processMapper.updateBeginTime(vo);
//		
//		vo.setOprStatus("FO2");
//		result = processMapper.updateOprStatus(vo);
//		
//		return result;
//	}
//
//	@Override
//	public int updateEndTime(ProcessVO vo) {
//		int result = 0;
//		processMapper.updateEndTime(vo);
//		
//		vo.setOprStatus("FO1");
//		result = processMapper.updateOprStatus(vo);
//		
//		return result;
//	}

















}
