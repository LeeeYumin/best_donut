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
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanDeVO;
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
	
//============================================================================	
	
/* < 당일 생산지시&상세 > */
	@GetMapping("/ajax/todayProdIns")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getTodayIns(){
		return processService.getTodayIns();
	}


/* < 공정 > */
	
//1)조회
	//공정진행
	@GetMapping("/ajax/processInfo")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<ProcessVO> getProcessInfo(String prodInsDetailCode){
		return processService.getProcessInfo(prodInsDetailCode);
	}
	//공정 투입자재
	@GetMapping("/ajax/procMatInfo")
	@ResponseBody
	public List<ProcessVO> getProcMatInfo(String procDetailCode){
		return processService.getProcMatInfo(procDetailCode);
	}
	//공정 설비가동상태
	@GetMapping("/ajax/procEqmInfo")
	@ResponseBody
	public List<ProcessVO> getProcEqmInfo(String procDetailCode){
		return processService.getProcEqmInfo();
	}
	//공정별 모든 설비
	@GetMapping("/ajax/eqmAllInfo")
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
	
	@PostMapping("/ajax/updateProcEqm")
	@ResponseBody
	public int modifyProcEqm(@RequestBody ProcessVO vo) { //공정사용 설비 변경
		return processService.updateProcEqm(vo);	
	}
//	//공정시작&가동중
//	@RequestMapping("/ajax/updateBeginTime")
//	@ResponseBody
//	public int modifyBegin(@RequestBody ProcessVO vo) { 
//		//System.out.println(vo);
//		return processService.updateBeginTime(vo);	
//	}
//	//공정종료&대기
//	@RequestMapping("/ajax/updateEndTime")
//	@ResponseBody
//	public int modifyEnd(@RequestBody ProcessVO vo) { 
//		return processService.updateEndTime(vo);	
//	}
	
	
	
}
