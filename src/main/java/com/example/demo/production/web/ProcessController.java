package com.example.demo.production.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
/* < 당일 생산지시&상세 > 데이터 */
	@GetMapping("/ajax/todayProdIns")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public Map<String, Object> getTodayIns(){
		return processService.getTodayIns();
	}

	

	
	
	
	
}
