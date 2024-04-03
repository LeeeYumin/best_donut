package com.example.demo.materials.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.materials.MaterialOrderReadVO;
import com.example.demo.materials.MaterialReadVO;
import com.example.demo.materials.MaterialVO;
import com.example.demo.materials.service.MaterialsService;

@Controller
public class MaterialsController {

	@Autowired
	MaterialsService materialsService;

	// 자재 재고 목록 페이지 이동
	@RequestMapping("/materials/stockList")
	public String materialStockList() {
		return "materials/materialStockList"; // "/template(기본값-동적 컨텐츠)/index.html"
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

	// 자재 발주 등록 페이지 이동
	@RequestMapping("/materials/orders")
	public String orders() {
		return "materials/materialOrders"; // "/template(기본값-동적 컨텐츠)/index.html"
	}
	
	// 자재 발주 목록 페이지 이동
	@RequestMapping("/materials/ordersList")
	public String ordersList() {
		return "materials/materialOrdersList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 자재 발주 목록 조회(ajax)
	@RequestMapping("/ajax/materialorders")
	@ResponseBody
	public List<MaterialOrderReadVO> getMaterialOrders(){
		return materialsService.getMaterialOrders();
	}
	
	
	// 자재 입고 등록 페이지 이동
	@RequestMapping("/materials/warehousing")
	public String warehousing() {
		return "materials/materialWarehousing"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 자재 불출 등록 페이지 이동
	@RequestMapping("/materials/outgoing")
	public String outgoing() {
		return "materials/materialOutgoing"; // "/template(기본값-동적 컨텐츠)/index.html"
	}

	// 자재 입고/불출 목록 페이지 이동
	@RequestMapping("/materials/inoutList")
	public String inoutList() {
		return "materials/materialInOutList"; // "/template(기본값-동적 컨텐츠)/index.html"
	}
}
