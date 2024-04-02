package com.example.demo.eqm.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.eqm.EqmVO;
import com.example.demo.eqm.service.EqmService;

@Controller
public class EqmController {
	
	@Autowired EqmService eqmService;
	
	@GetMapping("eqm")
	public String eqmMain() {
		return "eqm/eqmMain";
	}
	
	@GetMapping("/ajax/eqm")
	@ResponseBody
	public List<EqmVO> getEqm() {
		return eqmService.getEqm();
	}
	
}
