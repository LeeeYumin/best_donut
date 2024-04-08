package com.example.demo.orders.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.mapper.OrdersMapper;
import com.example.demo.orders.service.OrdersService;

@Service
public class OrdersServiceImpl implements OrdersService{

	@Autowired OrdersMapper ordersMapper;

	@Override
	public List<Map<String, Object>> getOrders(String ordersCode) {
		return ordersMapper.getOrders(ordersCode);
	}

	@Override
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode) {
		return ordersMapper.getOrdersDetail(ordersCode);
	}

	@Override
	public boolean insertOrders(OrdersVO vo) {
		ordersMapper.insertOrders(vo);
		System.out.println(vo.getOrdDetList());
		
		int result = 0;
		for(int i = 0; i < vo.getOrdDetList().size(); i++) {
			OrdersDetailVO dvo = vo.getOrdDetList().get(i);
			
			dvo.setOrdersCode(vo.getOrdersCode());
			result = ordersMapper.insertOrdDet(dvo);
		}
		
		return result == 1 ? true : false;
	}
	
}
