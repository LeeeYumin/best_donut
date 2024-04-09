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
}
