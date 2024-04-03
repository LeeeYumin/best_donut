package com.example.demo.quality.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.quality.service.QualityService;

@Controller
public class QualityController {
	
	@Autowired
	QualityService qualityService;
	//자재 품질 등록
	@GetMapping("insertMatQuality") // url
	public String insertMatQuality () { // 함수이름
		return "quality/insertMatQuality"; // 파일위치(qualityMain 이름변경)
	}
	
	@GetMapping("ajax/matInfo") //정보를 가져오는 ajax
	@ResponseBody
	public List<Map<String, Object>> getMatInfo(){
		return qualityService.getMatInfo();
	}
	
	
	//자재 품질 관리
	
	
	//완제품 품질 등록
	
	
	//완제품 품질 관리
	
	
	//품질 검사 관리
	
}
