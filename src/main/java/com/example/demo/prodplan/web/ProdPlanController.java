package com.example.demo.prodplan.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProdPlanController {

	@RequestMapping("/production/prodPlan")
	public String prodPlan() {
		return "production/prodPlan";
	}
}
