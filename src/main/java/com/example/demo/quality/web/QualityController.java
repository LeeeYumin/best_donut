package com.example.demo.quality.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
public class QualityController {

	@GetMapping("qualityMain") // url
	public String qualityMain () { // 함수이름
		return "quality/qualityMain"; // 파일위치
	}
	
	
	
}
