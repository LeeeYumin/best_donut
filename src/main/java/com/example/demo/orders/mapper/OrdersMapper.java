package com.example.demo.orders.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;

@Mapper
public interface OrdersMapper {

	public List<Map<String, Object>> getOrders(String ordersCode);	// 주문조회
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode);	// 주문상세조회
	
	public int insertOrders(OrdersVO vo);
	public int insertOrdDet(OrdersDetailVO dvo);
		
}
