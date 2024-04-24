package com.example.demo.orders.service;

import java.util.List;
import java.util.Map;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.ProdReqDetailVO;
import com.example.demo.orders.ProdReqVO;

public interface OrdersService {
	
// I. 주문
	
	// 1. 조회
	public List<OrdersVO> getOrders(OrdersVO vo);						// 주문조회
	public List<OrdersVO> getProdReqOrders(OrdersVO vo);				// 생산요청 대상 주문조회	
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode);		// 주문상세조회
	public List<Map<String, Object>> getCompany();						// 거래처 조회
	
	// 2. 등록
	public boolean insertOrders(OrdersVO vo);							// 주문등록
	
	// 3. 수정
	public boolean updateOrders(OrdersVO vo);
	public boolean updateOrdCheck(List<OrdersVO> list);
	
	// 4. 삭제
	public int deleteOrders(String ordersCode);							// 주문삭제
	public int deleteOrdDet(String ordersCode);							// 주문상세삭제
	
	
// II. 생산요청
	
	// 1. 조회
	public List<ProdReqVO> getProdReq(ProdReqVO vo);					// 생산요청조회
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode);		// 생산요청상세조회
	
	// 2. 등록
	public boolean insertProdReq(ProdReqVO vo);							// 생산요청등록
}
