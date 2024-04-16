package com.example.demo.comCode.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ComCodeController {
	
	
	// 공통코드 목록 페이지 이동
	@GetMapping("comCodeList")
	public String comCodeList() {
		return "comCode/comCodeList";
	}
	
	// 공통코드 등록 페이지 이동
	@GetMapping("comCodeInsert")
	public String comCodeInsert() {
		return "comCode/comCodeInsert";
	}
	
	// 거래처 목록 페이지 이동
	@GetMapping("companyList")
	public String companyList() {
		return "comCode/companyList";
	}
	
	// 거래처 등록 페이지 이동
	@GetMapping("companyInsert")
	public String companyInsert() {
		return "comCode/companyInsert";
	}
}
