package com.example.demo.materials.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.service.MaterialsService;

@Controller
public class MaterialsController {

	@Autowired
	MaterialsService materialsService;

	@RequestMapping("/materials/stockList")
	public String stockList() {
		return "materials/stockList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 재고 조회(ajax)
	@GetMapping("/ajax/materials") // fetch 함수에 들어가는 uri
	@ResponseBody
	public List<MaterialVO> getMaterials(String matName) {
		return materialsService.getMaterials(matName);
	}

	// 자재별 상세조회(ajax)
	@GetMapping("/ajax/materiallots")
	@ResponseBody
	public List<MaterialReadVO> getMaterialLots(String matCode) {
		return materialsService.getMaterialDetails(matCode);
	}
}
