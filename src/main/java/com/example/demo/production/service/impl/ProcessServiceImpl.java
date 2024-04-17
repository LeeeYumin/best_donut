package com.example.demo.production.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.production.ProcessVO;
import com.example.demo.production.ProdInsDeVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.mapper.ProcessMapper;
import com.example.demo.production.service.ProcessService;

@Service
public class ProcessServiceImpl implements ProcessService {
	
	@Autowired ProcessMapper processMapper;

	
/* 1.당일 생산지시 */
	@Override
	public Map<String,Object> getTodayIns() {
		
		Map<String,Object> map = new HashMap<>();
		
		List<ProdInsVO> list = processMapper.getTodayIns(); //지시
		map.put("prodIns", list);
		
		//지시상세
		if(list != null && list.size() > 0) {
			
			List<ProdInsDeVO> list2 = processMapper.getTodayInsDetail(list.get(0).getProdInstructCode());
			map.put("prodInsDe", list2);
			
			//지시상세 상태(함수호출)
			for(int i=0; i < list2.size(); i++) {
				String st = processMapper.getInsDeStatus(list2.get(i).getProdInstructDetailCode());
				list2.get(i).setInsDeStatus(st);
			}

		}
		return map;
	}
	
//	@Override
//	public List<ProdInsVO> getTodayIns() { //완료된 생산지시
//		return processMapper.getTodayIns();
//	}
//	@Override
//	public List<ProdInsDeVO> getTodayInsDetail(String prodInstructCode) { //완료된 생산지시 상세
//		return processMapper.getTodayInsDetail(prodInstructCode);
//	}
//	public String getInsDeStatus(String prodInsDetailCode) { //지시상세 상태(함수호출)
//		return processMapper.getInsDeStatus(prodInsDetailCode);
//	}


	


/* 2.공정 */
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



/* 3.공정실적 */
	@Override
	public List<ProdInsVO> getProcResultList(ProdInsVO vo) { //완료된 생산지시
		return processMapper.getProcResultList(vo);
	}
	@Override
	public List<ProdInsDeVO> getProcResultDeList(String prodInstructCode) { //완료된 생산지시 상세
		return processMapper.getProcResultDeList(prodInstructCode);
	}

}
