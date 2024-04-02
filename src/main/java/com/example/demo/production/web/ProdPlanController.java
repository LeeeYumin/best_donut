package com.example.demo.production.web;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.production.service.ProdPlanService;

@Controller
public class ProdPlanController {
	
	@Autowired ProdPlanService prodPlanService;

	//생산계획페이지이동
	@GetMapping("prodPlan") // 페이지 uri
	public String prodPlan() {
		return "production/prodPlan"; // html 파일 위치
	}
	
	//생산요청&상세 데이터
	@GetMapping("/ajax/prodReq")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getProdeReq(){
		return prodPlanService.getProdReq();
	}
	
	
}
