package com.example.demo.quality.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.quality.AdminMatQualVO;
import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.ProDetailVO;
import com.example.demo.quality.ProQltyVO;
import com.example.demo.quality.QualityUnfitVO;
import com.example.demo.quality.service.QualityService;

/*
 *  작성자 : 이유민
 *  작성일자 : 2024.04.15
 *  컨트롤러 내용 : 자재, 완제품에 관련된 품질검사
 */
@Controller
public class QualityController {
	
	@Autowired
	QualityService qualityService;
	
	//자재 품질 등록 페이지 이동
	@GetMapping("insertMatQuality") // url
	public String insertMatQuality () { // 함수이름
		return "quality/insertMatQuality"; // 파일위치(qualityMain 에서 이름변경)
	}
	
	//Lot별 자재 목록
	@GetMapping("ajax/matInfo") //정보를 가져오는 ajax. ajax 는 @ResponseBody 같이!
	@ResponseBody
	public List<Map<String, Object>> getMatInfo(MatQltyCheckVO vo){
		return qualityService.getMatInfo(vo);
	}
	
	//자재 품질 등록 버튼
	@PostMapping("ajax/insertMatQ")
	@ResponseBody
	public boolean insertMatQuality(@RequestBody List<MatQltyCheckVO> vo) {
		return qualityService.insertMatQuality(vo);		
	}
	
	//자재 품질 관리 페이지 이동
	@GetMapping("adminMatQuality")
	public String adminMatQuality () {		
		return "quality/adminMatQuality";
	}
	
	//자재 품질 관리 - 정보 가져오기
	@PostMapping("ajax/adminMat")
	@ResponseBody
	public List<AdminMatQualVO> adminMatQuality(@RequestBody AdminMatQualVO vo){
		return qualityService.adminMatQuality(vo);
	}
	
	//완제품 품질 등록 페이지로 이동
	@GetMapping("insertProQuality")
	public String insertProQuality () {
		return "quality/insertProQuality";
	}
	
	//완제품 품질 등록 처리
	@GetMapping("ajax/selectProQuality")
	@ResponseBody
	public List<ProDetailVO> selectProQuality(String allEndTime) {
		return qualityService.selectProQuality(allEndTime);
	}
	
	@PostMapping("ajax/insertProQual")
	@ResponseBody
	public boolean insertProQual(@RequestBody List<ProQltyVO> vo){
		return qualityService.insertProQual(vo);
	}
	
	@GetMapping("ajax/selectProQual")
	@ResponseBody
	public List<Map<String, Object>> selectProQual(){
		return qualityService.selectProQual();
	}
	
//	@GetMapping("ajax/addProQual")
//	@ResponseBody
//	public boolean addProQual(int goodCnt, String productLotCode) {
//		return qualityService.addProQual(goodCnt, productLotCode);
//	}
	
	//완제품 품질 관리 페이지 이동
	@GetMapping("adminProQuality")
	public String adminProQuality () {		
		return "quality/adminProQuality";
	}
	
	//완제품 품질 관리
	@GetMapping("ajax/adminProQual")
	@ResponseBody
	public List<ProQltyVO> adminProQual(String productName, String checkRecvDate) {
		return qualityService.adminProQuality(productName, checkRecvDate);
	}
	
	//불량품 등록 페이지 이동
	@GetMapping("insertUnfitProd")
	public String insertUnfitProd () {
		return "quality/insertUnfitProd";
	}
	
	@GetMapping("ajax/unfitProd")
	@ResponseBody
	public List<QualityUnfitVO> getUnfitProd(){
		return qualityService.getUnfitProd();
	}
	

	
}
