package com.example.demo.orders;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.orders.mapper.OrdersMapper;
import com.example.demo.product.ProductVO;
import com.example.demo.product.mapper.ProductMapper;

@SpringBootTest
public class OrdersServiceTest {

	@Autowired OrdersMapper ordersMapper;
	@Autowired ProductMapper productMapper;	
	
//	@Test
	public void 주문조회() {
		OrdersVO vo = new OrdersVO();
		List<OrdersVO> ordersList = ordersMapper.getOrders(vo);
		for (OrdersVO list : ordersList) {
			System.out.println(list);
		}
	}
	
//	@Test
	public void 주문상세조회() {
		String ordersCode = "ORD00001";
		List<OrdersDetailVO> ordersDetail = ordersMapper.getOrdersDetail(ordersCode);
		for (OrdersDetailVO list : ordersDetail) {
			System.out.println(list);
		}
	}
	
//	@Test
	public void 제품조회() {
		List<ProductVO> productList = productMapper.getProduct();
		for (ProductVO list : productList) {
			System.out.println(list);
		}
	}
	
//	@Test
	public void 주문상태변경(){
			
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		ProdReqVO vo = new ProdReqVO();
		
		Date dueStartDate = new Date();
		Date dueEndDate = new Date();
		
		try {
			dueStartDate = sdf.parse("2024-04-23");
			dueEndDate = sdf.parse("2024-04-28");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		vo.setDueStartDate(dueStartDate);
		vo.setDueEndDate(dueEndDate);
		
		int result = ordersMapper.updateOrdStat(vo);
		System.out.println("주문상태변경 result : " + result);
	}

//	@Test
	public void 자재LOT조회() {
		String prodReqCode = "PRQ00001";
		System.out.println(ordersMapper.getProdReqDet(prodReqCode));
	}
	
	@Test
	public void 출고등록() {
		String ordersCode = "ORD00011";
		String result = "0";
		
		OrdersVO vo = new OrdersVO();
		vo.setOrdersCode(ordersCode);
		vo.setResult(result);
		
		System.out.println(productMapper.prodInoutProcess(vo));
	}
	
}
