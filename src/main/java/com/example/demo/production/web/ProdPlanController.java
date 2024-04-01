package com.example.demo.production.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.production.ProdPlanVO;
import com.example.demo.production.service.ProdPlanService;

@Controller
public class ProdPlanController {
	
	@Autowired ProdPlanService prodPlanService;

	//생산계획페이지이동
//	@GetMapping("/production/prodPlan")
//	public String prodPlan() {
//		return "production/prodPlan";
//	}
	
	@GetMapping("prodPlan") // 페이지 uri
	public String prodPlan() {
		return "production/prodPlan"; // html 파일 위치
	}
	
	@GetMapping("/ajax/prodPlan")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<ProdPlanVO> getProdeReq(){
		return prodPlanService.getProdReq();
	}
	
	
}
