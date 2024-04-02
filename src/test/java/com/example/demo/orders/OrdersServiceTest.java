package com.example.demo.orders;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.orders.mapper.OrdersMapper;

@SpringBootTest
public class OrdersServiceTest {

	@Autowired OrdersMapper ordersMapper;
	
	@Test
	public void 주문조회() {
		List<Map<String,Object>> ordersList = ordersMapper.getOrders();
		for (Map<String, Object> list : ordersList) {
			System.out.println(list);
		}
	}
	
	@Test
	public void 주문상세조회() {
		String ordersCode = "ORD00001";
		List<Map<String, Object>> ordersDetail = ordersMapper.getOrdersDetail(ordersCode);
		for (Map<String, Object> list : ordersDetail) {
			System.out.println(list);
		}
	}
	
}
