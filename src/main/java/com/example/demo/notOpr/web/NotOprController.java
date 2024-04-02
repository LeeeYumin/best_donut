package com.example.demo.notOpr.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.notOpr.NotOprVO;
import com.example.demo.notOpr.service.NotOprService;

@Controller
public class NotOprController {
	
	@Autowired NotOprService notOprService;
	
	@GetMapping("notopr")
	public String notOprMain() {
		return "notOpr/notOprMain";
	}
	
	@GetMapping("/ajax/notOpr")
	@ResponseBody
	public List<NotOprVO> getNotOpr() {
		return notOprService.getNotOpr();
	}
	
}
