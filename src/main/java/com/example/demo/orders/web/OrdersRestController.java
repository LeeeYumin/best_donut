package com.example.demo.orders.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.service.OrdersService;

@RestController
public class OrdersRestController {

	@Autowired OrdersService ordersService;
	
	// 주문 조회(ajax)
	@GetMapping("/ajax/orders")	// fetch 함수에 들어가는 uri
	public List<OrdersVO> getOrders(){
		return ordersService.getOrders();
	}
}
