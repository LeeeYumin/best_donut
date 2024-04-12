package com.example.demo.orders.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;

@Mapper
public interface OrdersMapper {

	// 1. 주문조회
	public List<OrdersVO> getOrders(OrdersVO vo);						// 주문조회
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode);		// 주문상세조회
	public List<Map<String, Object>> getCompany();						// 거래처조회
	
	// 2. 주문등록
	public int insertOrders(OrdersVO vo);								// 주문등록
	public int insertOrdDet(OrdersDetailVO vo);							// 주문상세등록
	
	// 3. 주문삭제
	public int deleteOrders(String ordersCode);							// 주문삭제
	public int deleteOrdDet(String ordersCode);							// 주문상세ㄴ삭제
}
