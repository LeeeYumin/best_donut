package com.example.demo.orders.service;

import java.util.List;
import java.util.Map;

import com.example.demo.orders.OrdersVO;

public interface OrdersService {
	
	public List<Map<String, Object>> getOrders(String ordersCode);
	public List<Map<String, Object>> getOrdersDetail(String ordersCode);
	public boolean insertOrders(OrdersVO vo);
}
