package com.example.demo.notOpr.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.notOpr.NotOprVO;
import com.example.demo.notOpr.service.NotOprService;

@Controller
public class NotOprController {
	
	@Autowired NotOprService notOprService;
	
	@GetMapping("notoprlist")
	public String notOprMain() {
		return "notOpr/notOprList";
	}
	
	@PostMapping("/ajax/notOpr")
	@ResponseBody
	public List<NotOprVO> getNotOpr(@RequestBody NotOprVO vo) {
		return notOprService.getNotOpr(vo);
	}
	
}
