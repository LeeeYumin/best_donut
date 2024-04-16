package com.example.demo.production.web;


import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.production.ProdInsVO;
import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;
import com.example.demo.production.service.ProdPlanService;

@Controller
public class ProdPlanController {
	
	@Autowired ProdPlanService prodPlanService;

	/* 페이지 이동 */
	
	//생산계획 등록
	@GetMapping("prodPlan") // 페이지 uri
	public String prodPlan() {
		return "production/prodPlan"; // html 파일 위치
	}
	
	//생산계획 관리
	@GetMapping("prodPlanList")
	public String prodPlanList() {
		return "production/prodPlanList";
	}
	
	//생산지시 등록
	@GetMapping("prodInstruct")
	public String prodInstruct() {
		return "production/prodInstruct";
	}
	
	//생산지시 관리

	

	
//============================================================================	
	
/* < 생산요청&상세 > 데이터 */
	@GetMapping("/ajax/prodReq")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getProdeReq(){
		return prodPlanService.getProdReq();
	}

	
/* < 생산계획 > */
	
	//1)조회
	@GetMapping("/ajax/beforeInsertPlanCode")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public ProdPlanVO beforeInsertPlanCode(){
		return prodPlanService.beforeInsertPlanCode();
	}
	
	@PostMapping("/ajax/prodPlanList")
	@ResponseBody
	public List<ProdPlanVO> getProdPlanList(@RequestBody ProdPlanVO vo){
		return prodPlanService.getProdPlan(vo);
	}
	//상세 데이터
	@GetMapping("/ajax/prodPlanAll")
	@ResponseBody
	public List<ProdPlanAllVO> getProdPlanAll(String prodPlanCode){
		return prodPlanService.getProdPlanAll(prodPlanCode);
	}
	
	//2)등록
	//JSON
	@PostMapping("/ajax/insertProdPlan")
	@ResponseBody
	public ProdPlanVO save(@RequestBody ProdPlanVO vo) { 
		System.out.println(vo);
		prodPlanService.insertProdPlan(vo);
		return vo;
	}

	//3)수정
	//JSON
	@PostMapping("/ajax/updateProdPlanDetail")
	@ResponseBody
	public int modify(@RequestBody List<ProdPlanDeVO> dvo) { 
		System.out.println(dvo);
		return prodPlanService.updateProdPlanDetail(dvo);	
	}
	
	//4)삭제
	@PostMapping("/ajax/deleteProdPlan")
	@ResponseBody
	public Map<String,Object> remove(@RequestBody ProdPlanVO vo) { 
		System.out.println(vo);
		prodPlanService.deleteProdPlan(vo);
		
		return Collections.singletonMap("result", 1);
	}
	
	
/* < 생산지시 > */
	
	//1)조회
	//+지시 전 주간계획&상세 데이터
	@GetMapping("/ajax/weeklyPlan")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getWeeklyPlan(){
		return prodPlanService.getWeeklyPlan();
	}
	
	//+지시 전 설비상태 데이터
	@GetMapping("/ajax/eqmCheck")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<ProdInsVO> getEqm(){
		return prodPlanService.getEqm();
	}
	//지시코드
	@GetMapping("/ajax/beforeInsertInsCode")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public ProdInsVO beforeInsertInsCode(){
		return prodPlanService.beforeInsertInsCode();
	}
	
	//2)등록
	@PostMapping("/ajax/insertProdInstruct")
	@ResponseBody
	public ProdInsVO saveIns(@RequestBody ProdInsVO vo) { 
		System.out.println(vo);
		prodPlanService.insertProdInstruct(vo);
		return vo;
	}
//	//+지시 등록하면서 => 계획의 미지시&지시수량 변경
//	@PostMapping("/ajax/updateAfterInstruct")
//	@ResponseBody
//	public int modifyAfterIns(@RequestBody List<ProdPlanDeVO> dvo) { 
//		System.out.println(dvo);
//		return prodPlanService.updateAfterInstruct(dvo);	
//	}
	
	
	
	
}
