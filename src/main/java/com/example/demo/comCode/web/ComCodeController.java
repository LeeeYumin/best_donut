package com.example.demo.comCode.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.annotation.RequestScope;

import com.example.demo.comCode.ComCodeDetailVO;
import com.example.demo.comCode.ComCodeVO;
import com.example.demo.comCode.CompanyVO;
import com.example.demo.comCode.service.ComCodeService;

@Controller
public class ComCodeController {
	
	@Autowired ComCodeService comCodeService;
	
	/* I. 공통코드 */
	
	// 1. 페이지 이동
	
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
	
	// 2. 조회
	
	// 주코드 조회
	@PostMapping("ajax/getComCodeList")
	@ResponseBody
	public List<ComCodeVO> getComCodeList(@RequestBody ComCodeVO vo) {
		return comCodeService.getComCodeList(vo);
	}

	// 부코드 조회
	@PostMapping("ajax/getComCodeDetList")
	@ResponseBody
	public List<ComCodeDetailVO> getComCodeDetList(@RequestBody ComCodeDetailVO vo) {
		return comCodeService.getComCodeDetList(vo);
	}
	
	// 주코드 입력
	@PostMapping("ajax/insertComCode")
	@ResponseBody
	public boolean insertComCode(@RequestBody ComCodeVO vo) {
		return comCodeService.insertComCode(vo);
	}
	
	// 부코드 입력
	@PostMapping("ajax/insertComCodeDet")
	@ResponseBody
	public boolean insertComCodeDet(@RequestBody ComCodeDetailVO vo) {
		return comCodeService.insertComCodeDet(vo);
	}
	
	// 주코드 중복검사
	@GetMapping("ajax/valComCode")
	@ResponseBody
	public boolean valComCode(String maincode) {
		return comCodeService.valComCode(maincode);
	}
	
	// 주코드 중복검사
	@GetMapping("ajax/valComCodeDet")
	@ResponseBody
	public boolean valComCodeDet(String subcode) {
		return comCodeService.valComCodeDet(subcode);
	}
	
	
	/* II. 거래처 */
	
	// 거래처 입력
	@PostMapping("ajax/insertCompany")
	@ResponseBody
	public boolean insertCompany(@RequestBody CompanyVO vo) {
		return comCodeService.insertCompany(vo);
	}
	
	// 거래처 검색
	@PostMapping("ajax/getCompanySearchList")
	@ResponseBody
	public List<CompanyVO> getCompanySearchList(@RequestBody CompanyVO vo) {
		return comCodeService.getCompanySearchList(vo);
	}
	
}
