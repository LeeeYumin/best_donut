package com.example.demo.quality.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.quality.MatQltyCheckVO;
import com.example.demo.quality.service.QualityService;

@Controller
public class QualityController {
	
	@Autowired
	QualityService qualityService;
	
	//자재 품질 등록 페이지 이동
	@GetMapping("insertMatQuality") // url
	public String insertMatQuality () { // 함수이름
		return "quality/insertMatQuality"; // 파일위치(qualityMain 에서 이름변경)
	}
	
	@GetMapping("ajax/matInfo") //정보를 가져오는 ajax. ajax 는 @ResponseBody 같이!
	@ResponseBody
	public List<Map<String, Object>> getMatInfo(String matLotCode, String inoutDate){
		return qualityService.getMatInfo(matLotCode, inoutDate);
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
	@GetMapping("ajax/adminMat")
	@ResponseBody
	public List<Map<String, Object>> adminMatQuality(String matCode, String inoutDate){
		return qualityService.adminMatQuality(matCode, inoutDate);
	}
	
	//완제품 품질 등록 페이지로 이동
	@GetMapping("insertProQuality")
	public String insertProQuality () {
		return "quality/insertProQuality";
	}
	
	//완제품 품질 등록 처리
	
	//완제품 품질 관리
	
	
	//품질 검사 관리
	
}
