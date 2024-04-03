package com.example.demo.orders.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public List<Map<String, Object>> getOrdersDetail(String ordersCode) {
		return ordersMapper.getOrdersDetail(ordersCode);
	}

	@Override
	public boolean insertOrders(OrdersVO vo) {
		return ordersMapper.insertOrders(vo) == 1 ? true : false;
	}
	
}
