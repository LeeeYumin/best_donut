package com.example.demo.orders.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OrdersController {

	@GetMapping("orders")
	public String ordersMain() {
		return "orders/ordersMain";
	}
	
}
