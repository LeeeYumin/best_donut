package com.example.demo.production.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.production.ProcessVO;
import com.example.demo.production.ProdInsDeVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanBVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;
import com.example.demo.production.mapper.ProdPlanMapper;
import com.example.demo.production.service.ProdPlanService;


@Service
public class ProdPlanServiceImpl implements ProdPlanService {
	
	@Autowired ProdPlanMapper prodPlanMapper;

	
/* < 생산요청 > */
	@Override
	public Map<String,Object> getProdReq() {
		Map<String,Object> map = new HashMap<>();
		List<ProdPlanBVO> list = prodPlanMapper.getProdReq();
		
		//요청
		map.put("prodReq", list);
		
		//요청상세
		if(list != null && list.size() > 0) {
			map.put("prodReqDe", prodPlanMapper.getProdReqDetail(list.get(0).getProdReqCode()));
		}
		return map;
	}


/* < 생산계획 > */
	//1)조회
	@Override
	public List<ProdPlanVO> getProdPlan(ProdPlanVO vo) {
		return prodPlanMapper.getProdPlan(vo);
	}
	@Override
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode) { //상세
		return prodPlanMapper.getProdPlanAll(prodPlanCode);
	}
	
	//2)등록
	@Override
	@Transactional
	public int insertProdPlan(ProdPlanVO vo) {
		//생산계획
		prodPlanMapper.insertProdPlan(vo);
		//생산요청 상태 update
		prodPlanMapper.updateProdReqStatus(vo);
		
		//생산계획 상세
		int result = 0;
		for(int i = 0; i < vo.getDvo().size(); i++) {
			ProdPlanDeVO devo = vo.getDvo().get(i);
			
			devo.setProdPlanCode(vo.getProdPlanCode()); //생산계획코드
			result = prodPlanMapper.insertProdPlanDetail(devo);
		}
		return result;
	}

	//3)수정
	@Override
	public int updateProdPlanDetail(List<ProdPlanDeVO> dvo) {
		int result = 0;
		
		for(int i=0; i < dvo.size(); i++) {
			result = prodPlanMapper.updateProdPlanDetail(dvo.get(i));
		}
		
		return result;
	}

	//4)삭제
	@Override
	@Transactional
	public int deleteProdPlan(ProdPlanVO vo) {

		//생산계획 상세
		int result = 0;
		for(int i = 0; i < vo.getDvo().size(); i++) {
			ProdPlanDeVO dvo = vo.getDvo().get(i);
			
			dvo.setProdPlanCode(vo.getProdPlanCode()); //생산계획코드
			result = prodPlanMapper.deleteProdPlanDetail(dvo);
		}
		
		//생산계획 (상세 삭제 후)
		prodPlanMapper.deleteProdPlan(vo);
		//생산요청 상태 수정
		prodPlanMapper.cancelProdReqStatus(vo);
		
		return result;
	}

	
/* < 생산지시 > */
	
	//+지시 전 주간생산계획
	@Override
	public Map<String,Object> getWeeklyPlan() {
		Map<String,Object> map = new HashMap<>();
		List<ProdPlanVO> list = prodPlanMapper.getWeeklyPlan();
		
		//계획
		map.put("weeklyPlan", list);
		
		//계획상세
		if(list != null && list.size() > 0) {
			map.put("weeklyPlanDe", prodPlanMapper.getWeeklyPlanDetail(list.get(0).getProdPlanCode()));
		}
		return map;
	}

	//+지시 전 설비상태 확인
	@Override
	public List<ProdInsVO> getEqm() {
		return prodPlanMapper.getEqm();
	}
	
	
	//1)등록
	@Override
	@Transactional
	public int insertProdInstruct(ProdInsVO vo) {
		//생산지시
		prodPlanMapper.insertProdInstruct(vo);
		
		//생산지시 상세
		int result = 0;
		for(int i = 0; i < vo.getPidvo().size(); i++) {
			ProdInsDeVO dvo = vo.getPidvo().get(i);
			System.out.println(dvo);
			
			dvo.setProdInstructCode(vo.getProdInstructCode()); //생산지시코드
			result = prodPlanMapper.insertProdInstructDetail(dvo);
		}
		//공정생성
		ProcessVO pvo = new ProcessVO();
		pvo.setProdInstructCode(vo.getProdInstructCode()); //생산지시코드
		prodPlanMapper.insertProcDetail(pvo);
		
		return result;
	}
	
	//+지시 등록하면서 => 계획의 미지시&지시수량 변경
	@Override
	public int updateAfterInstruct(List<ProdPlanDeVO> dvo) {
		int result = 0;
		for(int i = 0; i < dvo.size(); i++) {
			result = prodPlanMapper.updateAfterInstruct(dvo.get(i));
		}
		return result;
	}












}
