package com.example.demo.orders.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.service.OrdersService;
import com.example.demo.product.service.ProductService;

@Controller
public class OrdersController {

	@Autowired OrdersService ordersService;
	@Autowired ProductService productService;
	
	
	// 1. 페이지 이동
	
	// 테스트 페이지
	@GetMapping("ordersTest")
	public String ordersTest() {
		return "orders/ordersTest";
	}
	
	// 주문관리 페이지
	@GetMapping("ordersList")
	public String ordersMain() {
		return "orders/ordersList";
	}
	
	// 주문상세 페이지 
	@GetMapping("ordersDetail/{ordersCode}")
	public String ordersDetail(@PathVariable String ordersCode) {
		return "orders/ordersDetail";
	}
	
	// 주문등록 페이지
	@GetMapping("ordersInsert")
	public String insertOrders(Model model) {
		model.addAttribute("productList", productService.getProduct());
		return "orders/ordersInsert";
	}

	// 완제품출고관리 페이지
	@GetMapping("exportList")
	public String exportList() {
		return "orders/exportList";
	}
	
	// 완제품출고등록 페이지
	@GetMapping("exportInsert")
	public String exportInsert() {
		return "orders/exportInsert";
	}
	
	
	// 2. 조회
	
	// 거래처조회
	@GetMapping("ajax/getCompany")
	@ResponseBody
	public List<Map<String, Object>> getCompany() {
		return ordersService.getCompany();
	}
	
	// 주문조회
	@PostMapping("ajax/ordersList")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<OrdersVO> getOrders(@RequestBody OrdersVO vo){
		return ordersService.getOrders(vo);
	}
	
	// 주문상세조회
	@GetMapping("ajax/ordersDetail")
	@ResponseBody
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode) {
		return ordersService.getOrdersDetail(ordersCode);
	}
		
	
	// 3. 등록
	
	// 주문등록
	@PostMapping("ajax/insertOrders")
	@ResponseBody
	public boolean insertOrders(@RequestBody OrdersVO vo) {
		return ordersService.insertOrders(vo);
	}
	
	
	// 4. 삭제
	
	// 주문삭제
	@PostMapping("ajax/deleteOrders")
	@ResponseBody
	public int deleteOrders(@RequestBody String[] ordersCodes) {

		int result = 0;
		for(String ocode : ordersCodes) {
			if(ocode != "" && ocode != null) {
				ordersService.deleteOrdDet(ocode);
				result += ordersService.deleteOrders(ocode);
			}			
		}
		return result;
	}
	
}