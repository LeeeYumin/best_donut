package com.example.demo.bom.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.bom.BomVO;
import com.example.demo.bom.service.BomService;

@Controller
public class BomController {
	
	@Autowired
	BomService bomService;
	
	// 자재 발주용 BOM 목록 조회
	@GetMapping("/ajax/bomlist") // fetch 함수에 들어가는 uri
	@ResponseBody
	public List<BomVO> getMatOrdersBom() {
		return bomService.getMatOrdersBom();
	}
	
	// 자재 불출용 BOM 목록 조회
	@GetMapping("/ajax/bomoutlist") // fetch 함수에 들어가는 uri
	@ResponseBody
	public List<BomVO> getMatOutBom(String productCode) {
		return bomService.getMatOutBom(productCode);
	}
	
	//BOM관리
	@GetMapping("/insertBom")
	public String insertBom() {
		return "bom/insertBom";
	}
	
	//BOM관리 - 품목확인 화면
	@GetMapping("ajax/insertBom")
	@ResponseBody
	public List<BomVO> getProdBom() {
		return bomService.getProdBom();
	}
	
	//BOM목록
	@GetMapping("/bomList")
	public String bomList() {
		return "bom/bomList";
	}
	
	//BOM작성화면
	@GetMapping("/insertBom2")
	public String insertBom2() {
		return "bom/insertBom2";
	}
	
	//BOM관리 - 품목확인 화면(grid 안에 데이터)
	@GetMapping("ajax/bomList")
	@ResponseBody
	public List<BomVO> getListBom() {
		return bomService.getListBom();
	}
	
	//BOM관리 - 품목 상세 화면(grid2에 상품종류별)
	@GetMapping("ajax/bomselList")
	@ResponseBody
	public List<BomVO> bomselList(String bomCode) {
		return bomService.bomselList(bomCode);
	}
	
	//BOM관리 - 조회먼저
	@GetMapping("ajax/selectBom")
	@ResponseBody
	public List<BomVO> selectBom() {
		return bomService.selectBom();
	}
}
