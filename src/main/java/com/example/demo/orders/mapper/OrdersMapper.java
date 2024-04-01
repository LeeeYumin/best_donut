package com.example.demo.orders.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.orders.OrdersVO;

@Mapper
public interface OrdersMapper {

	public List<OrdersVO> getOrders();
}
