package com.example.demo.orders.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.service.OrdersService;

@Controller
public class OrdersController {

	@Autowired OrdersService ordersService;
	
	// 1. 페이지 이동 메서드
	
	// 테스트 페이지
	@GetMapping("ordersTest")
	public String ordersTest() {
		return "orders/ordersTest";
	}
	
	// 주문조회 페이지
	@GetMapping("ordersList")	// 페이지 uri
	public String ordersMain() {
		return "orders/ordersList";	// html 파일 위치
	}
	
	// 주문상세 페이지 
	@GetMapping("ordersDetail/{ordersCode}")
	public String ordersDetail(@PathVariable String ordersCode) {
		return "orders/ordersDetail";
	}
	
	// 주문등록 페이지
	@GetMapping("insertOrders")
	public String insertOrders() {
		return "orders/insertOrders";
	}
	
	
	// 2. 조회
	
	// 주문조회
	@GetMapping("ajax/ordersList")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<Map<String, Object>> getOrders(String ordersCode){
		return ordersService.getOrders(ordersCode);
	}
	
	// 주문상세조회
	@GetMapping("ajax/ordersDetail")
	@ResponseBody
	public List<Map<String, Object>> getOrdersDetail(String ordersCode) {
		return ordersService.getOrdersDetail(ordersCode);
	}
	
	
	// 3. 등록
	
	// 주문등록
	@PostMapping("ajax/insertOrders")
	@ResponseBody
	public OrdersVO insertOrders(OrdersVO vo) {
		System.out.println(vo);
		ordersService.insertOrders(vo);
		return vo;
	}
}