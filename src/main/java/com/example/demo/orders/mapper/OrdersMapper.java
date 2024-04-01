package com.example.demo.orders.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrdersMapper {

	public List<Map<String, Object>> getOrders();
}
