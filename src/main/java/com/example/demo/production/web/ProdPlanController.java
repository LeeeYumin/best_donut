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

import com.example.demo.production.ProdPlanAllVO;
import com.example.demo.production.ProdPlanDeVO;
import com.example.demo.production.ProdPlanVO;
import com.example.demo.production.service.ProdPlanService;

@Controller
public class ProdPlanController {
	
	@Autowired ProdPlanService prodPlanService;

	/* 생산계획페이지이동 */
	@GetMapping("prodPlan") // 페이지 uri
	public String prodPlan() {
		return "production/prodPlan"; // html 파일 위치
	}
	
	/* < 생산요청&상세 > 데이터 */
	@GetMapping("/ajax/prodReq")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getProdeReq(){
		return prodPlanService.getProdReq();
	}
	
	
	/* < 생산계획 > */
	@GetMapping("prodPlanList") // 페이지 uri
	public String prodPlanList() {
		return "production/prodPlanList"; // html 파일 위치
	}
	
	//1)조회
	@PostMapping("/ajax/prodPlanList")
	@ResponseBody
	public List<ProdPlanVO> getProdPlanList(@RequestBody ProdPlanVO vo){
		return prodPlanService.getProdPlan(vo);
	}
	//상세 데이터
	@GetMapping("/ajax/prodPlanAll")	// fetch 함수에 들어가는 uri
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
	
	
	
}
