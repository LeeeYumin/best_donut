package com.example.demo.production.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.production.ProcessVO;
import com.example.demo.production.ProdInsDeVO;
import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;
import com.example.demo.production.service.ProcessService;

@Controller
public class ProcessController {
	
	@Autowired ProcessService processService;

/* 페이지 이동 */
	
	//공정진행
	@GetMapping("process")
	public String process() {
		return "production/process";
	}
	
	//공정실적
	@GetMapping("processResult")
	public String processResult() {
		return "production/processResult";
	}
	
//============================================================================	
	
/* < 당일 생산지시&상세 > */
	@GetMapping("/ajax/todayProdIns")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getTodayIns(){
		return processService.getTodayIns();
	}


/* < 공정 > */
	
	//1)조회
	@GetMapping("/ajax/processInfo") //공정진행
	@ResponseBody
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode){
		return processService.getProcessInfo(prodInsDetailCode);
	}
	
	@GetMapping("/ajax/procMatInfo") //공정 투입자재
	@ResponseBody
	public List<ProcessVO> getProcMatInfo(String procDetailCode){
		return processService.getProcMatInfo(procDetailCode);
	}
	
	@GetMapping("/ajax/procEqmInfo") //공정 설비가동상태
	@ResponseBody
	public List<ProcessVO> getProcEqmInfo(String procDetailCode){
		return processService.getProcEqmInfo();
	}
	
	@GetMapping("/ajax/eqmAllInfo") //공정별 모든 설비
	@ResponseBody
	public List<ProcessVO> getEqmAllInfo(String eqmName){
		return processService.getEqmAllInfo(eqmName);
	}
	
	
	//2)수정
	@RequestMapping("/ajax/updateProc") //공정update 프로시저 결과
	@ResponseBody
	public String modifyProc(@RequestBody ProcessVO vo) {
		processService.updateProc(vo);
		return vo.getResult();
	}
	
	@PostMapping("/ajax/updateProcEqm") //공정사용 설비 변경
	@ResponseBody
	public int modifyProcEqm(@RequestBody ProcessVO vo) { 
		return processService.updateProcEqm(vo);	
	}


	
/* < 공정실적 > */	
	@PostMapping("/ajax/processResult") //검색포함
	@ResponseBody
	public List<ProdInsDeVO> getProcResultDe(@RequestBody ProdInsDeVO dvo){ 
		return processService.getProcResultDeList(dvo);
	}
	
	
}
