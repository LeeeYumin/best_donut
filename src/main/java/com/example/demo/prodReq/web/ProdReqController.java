package com.example.demo.prodReq.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.prodReq.ProdReqDetailVO;
import com.example.demo.prodReq.ProdReqVO;
import com.example.demo.prodReq.service.ProdReqService;

@Controller
public class ProdReqController {


	@Autowired ProdReqService prodReqService;

	// 생산요청관리 페이지
	@GetMapping("prodReqList")
	public String prodReqList() {
		return "prodReq/prodReqList";
	}
	
	// 생산요청등록 페이지
	@GetMapping("prodReqInsert")
	public String prodReqInsert() {
		return "prodReq/prodReqInsert";
	}
	
	
	// 생산요청조회
	@PostMapping("ajax/getProdReq")
	@ResponseBody
	public List<ProdReqVO> getProdReq(@RequestBody ProdReqVO vo){
		return prodReqService.getProdReq(vo);
	}
	
	// 생산요청상세조회
	@GetMapping("ajax/getProdReqDet")
	@ResponseBody
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode){
		return prodReqService.getProdReqDet(prodReqCode);
	}
	
	// 생산요청등록
	@PostMapping("ajax/insertProdReq")
	@ResponseBody
	public boolean insertProdReq(@RequestBody ProdReqVO vo) {
		return prodReqService.insertProdReq(vo);
	}
	
}
