package com.example.demo.orders.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.ProdReqDetailVO;
import com.example.demo.orders.ProdReqVO;
import com.example.demo.orders.mapper.OrdersMapper;
import com.example.demo.orders.service.OrdersService;

@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired OrdersMapper ordersMapper;

// I. 주문
	
	// 1. 조회
	
	// (1) 거래처조회
	@Override
	public List<Map<String, Object>> getCompany() {
		return ordersMapper.getCompany();
	}
	
	// (2) 주문조회
	@Override
	public List<OrdersVO> getOrders(OrdersVO vo) {
		return ordersMapper.getOrders(vo);
	}

	// (3) 주문상세조회
	@Override
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode) {
		return ordersMapper.getOrdersDetail(ordersCode);
	}
	
	// 2. 등록
	
	// (1) 주문등록 + 주문상세등록
	@Override
	public boolean insertOrders(OrdersVO vo) {
		// 주문등록
		ordersMapper.insertOrders(vo);
		
		int result = 0;
		for(int i = 0; i < vo.getOrdDetList().size(); i++) {
			OrdersDetailVO dvo = vo.getOrdDetList().get(i);
			
			dvo.setOrdersCode(vo.getOrdersCode());
			// 주문상세등록
			result += ordersMapper.insertOrdDet(dvo);
		}
		
		return result >= 1 ? true : false;
	}
		
	// 3. 삭제

	// (1) 주문삭제
	@Override
	public int deleteOrders(String ordersCode) {
		return ordersMapper.deleteOrders(ordersCode);
	}

	// (2) 주문상세삭제
	@Override
	public int deleteOrdDet(String ordersCode) {
		return ordersMapper.deleteOrdDet(ordersCode);
	}
	
	
// II. 생산요청

	// 1 .조회
	
	// (1) 생산요청조회
	@Override
	public List<ProdReqVO> getProdReq(ProdReqVO vo) {
		return ordersMapper.getProdReq(vo);
	}
	
	// (2) 생산요청상세조회
	@Override
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode) {
		return ordersMapper.getProdReqDet(prodReqCode);
	}
		
	// 2. 등록

	// (1) 생산요청등록
	@Override
	public boolean insertProdReq(ProdReqVO vo) {
		ordersMapper.insertProdReq(vo);
		
		int result = 0;
		for(int i = 0; i < vo.getProdReqDetList().size(); i++) {

			ProdReqDetailVO dvo = vo.getProdReqDetList().get(i);
			dvo.setProdReqCode(vo.getProdReqCode());
			result += ordersMapper.insertProdReqDet(dvo);
		}
		
		ordersMapper.updateOrdStat(vo);
		
		return result >= 1 ? true : false;
	}

	@Override
	public boolean updateOrders(OrdersVO vo) {
		return ordersMapper.updateOrders(vo) >= 1 ? true : false;
	}

	@Override
	public boolean updateOrdCheck(List<OrdersVO> list) {
		
		int result = 0;
		
		for(OrdersVO vo : list) {
			result += ordersMapper.updateOrdCheck(vo);
		}
		
		return result >= 1 ? true : false;
	}

	// 생산요청 대상 주문조회	
	@Override
	public List<OrdersVO> getProdReqOrders(OrdersVO vo) {
		return ordersMapper.getProdReqOrders(vo);
	}
	
		
}
