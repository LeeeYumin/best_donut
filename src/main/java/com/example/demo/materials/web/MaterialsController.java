package com.example.demo.materials.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MaterialsController {

	@RequestMapping("/materials/stockList")
	public String stockList() {
		return "materials/stockList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}
}
