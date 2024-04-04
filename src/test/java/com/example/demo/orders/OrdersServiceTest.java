package com.example.demo.orders;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.materials.service.MaterialsService;
import com.example.demo.orders.mapper.OrdersMapper;
import com.example.demo.product.ProductVO;
import com.example.demo.product.mapper.ProductMapper;

@SpringBootTest
public class OrdersServiceTest {

	@Autowired OrdersMapper ordersMapper;
	@Autowired ProductMapper productMapper;
	
//	@Test
	public void 주문조회() {
		String ordersCode = "";
		List<Map<String,Object>> ordersList = ordersMapper.getOrders(ordersCode);
		for (Map<String, Object> list : ordersList) {
			System.out.println(list);
		}
	}
	
//	@Test
	public void 주문상세조회() {
		String ordersCode = "ORD00001";
		List<Map<String, Object>> ordersDetail = ordersMapper.getOrdersDetail(ordersCode);
		for (Map<String, Object> list : ordersDetail) {
			System.out.println(list);
		}
	}
	
	@Test
	public void 제품조회() {
		List<ProductVO> productList = productMapper.getProduct();
		for (ProductVO list : productList) {
			System.out.println(list);
		}
	}
	
}
