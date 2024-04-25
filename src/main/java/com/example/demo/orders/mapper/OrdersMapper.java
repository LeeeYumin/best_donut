package com.example.demo.orders.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.ProdReqDetailVO;
import com.example.demo.orders.ProdReqVO;

@Mapper
public interface OrdersMapper {

// I. 주문
	
	// 1. 조회
	public List<OrdersVO> getOrders(OrdersVO vo);						// 주문조회
	public List<OrdersVO> getProdReqOrders(OrdersVO vo);				// 생산요청 대상 주문조회	
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode);		// 주문상세조회
	public List<Map<String, Object>> getCompany();						// 거래처조회
	
	// 2. 등록
	public int insertProdReq(ProdReqVO vo);								// 생산요청등록
	public int insertProdReqDet(ProdReqDetailVO vo);					// 생산요청상세등록
	public int updateOrdStat(ProdReqVO VO);								// 주문상태변경
	
	// 3. 수정
	public int updateOrders(OrdersVO vo);								// 주문 수정
	public int updateOrdCheck(OrdersVO vo);								// 주문 상태 변경(확인/미확인)
	
	// 4. 삭제
	public int deleteOrders(String ordersCode);							// 주문삭제
	public int deleteOrdDet(String ordersCode);							// 주문상세삭제
	
	
// II. 생산요청
	
	// 1. 조회
	public List<ProdReqVO> getProdReq(ProdReqVO vo);					// 생산요청조회
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode);		// 생산요청상세조회
	
	// 2. 등록
	public int insertOrders(OrdersVO vo);								// 주문등록
	public int insertOrdDet(OrdersDetailVO vo);							// 주문상세등록
	
}
