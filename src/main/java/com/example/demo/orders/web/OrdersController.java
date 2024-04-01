package com.example.demo.orders.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.service.OrdersService;

@Controller
public class OrdersController {

	@Autowired OrdersService ordersService;
	
	// 주문조회 페이지 이동
	@GetMapping("orders")	// 페이지 uri
	public String ordersMain() {
		return "orders/ordersMain";	// html 파일 위치
		
		
	}
	
	// 주문 조회(ajax)
	@GetMapping("/ajax/orders")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<Map<String, Object>> getOrders(){
		return ordersService.getOrders();
	}

}