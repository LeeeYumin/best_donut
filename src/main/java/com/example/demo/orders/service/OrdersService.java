package com.example.demo.orders.service;

import java.util.List;
import java.util.Map;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;

public interface OrdersService {
	
	// 1. 주문조회
	public List<OrdersVO> getOrders(OrdersVO vo);						// 주문조회
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode);		// 주문상세조회
	public List<Map<String, Object>> getCompany();						// 거래처 조회
	
	// 2. 주문등록
	public boolean insertOrders(OrdersVO vo);
	
	// 3. 주문 삭제
	public int deleteOrders(String ordersCode);
	public int deleteOrdDet(String ordersCode);							// 주문상세ㄴ삭제
}
