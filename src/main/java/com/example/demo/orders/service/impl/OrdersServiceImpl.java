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
public class OrdersServiceImpl implements OrdersService{

	// 의존성 주입
	@Autowired OrdersMapper ordersMapper;

	// 거래처 조회
	@Override
	public List<Map<String, Object>> getCompany() {
		return ordersMapper.getCompany();
	}
	
	// 주문조회
	@Override
	public List<OrdersVO> getOrders(OrdersVO vo) {
		return ordersMapper.getOrders(vo);
	}

	// 주문상세조회
	@Override
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode) {
		return ordersMapper.getOrdersDetail(ordersCode);
	}

	// 주문등록 + 주문상세등록
	@Override
	public boolean insertOrders(OrdersVO vo) {
		ordersMapper.insertOrders(vo);
		
		int result = 0;
		for(int i = 0; i < vo.getOrdDetList().size(); i++) {
			OrdersDetailVO dvo = vo.getOrdDetList().get(i);
			
			dvo.setOrdersCode(vo.getOrdersCode());
			result += ordersMapper.insertOrdDet(dvo);
		}
		
		return result >= 1 ? true : false;
	}

	// 생산요청등록 + 생산요청상세등록
	@Override
	public boolean insertProdReq(ProdReqVO vo) {
		ordersMapper.insertProdReq(vo);
		
		int result = 0;
		for(int i = 0; i < vo.getProdReqDetList().size(); i++) {
			ProdReqDetailVO dvo = vo.getProdReqDetList().get(i);
			
			dvo.setProdReqCode(vo.getProdReqCode());
			result += ordersMapper.insertProdReqDet(dvo);
		}
		return result >= 1 ? true : false;
	}

	
}
