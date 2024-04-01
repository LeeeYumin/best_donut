package com.example.demo.orders.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.mapper.OrdersMapper;
import com.example.demo.orders.service.OrdersService;

@Service
public class OrdersServiceImpl implements OrdersService{

	@Autowired OrdersMapper ordersMapper;
	
	@Override
	public List<OrdersVO> getOrders() {
		return ordersMapper.getOrders();
	}
}
