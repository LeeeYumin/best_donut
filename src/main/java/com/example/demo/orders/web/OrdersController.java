package com.example.demo.orders.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.orders.service.OrdersService;

@Controller
public class OrdersController {

	@Autowired OrdersService ordersService;
	
	// 주문조회 페이지 이동
	@GetMapping("orders")	// 페이지 uri
	public String ordersMain() {
		return "orders/ordersMain";	// html 파일 위치
	}

}