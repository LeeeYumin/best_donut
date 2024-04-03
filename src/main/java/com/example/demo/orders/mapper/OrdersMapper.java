package com.example.demo.orders.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.PathVariable;

@Mapper
public interface OrdersMapper {

	public List<Map<String, Object>> getOrders(String ordersCode);
	public List<Map<String, Object>> getOrdersDetail(String ordersCode);
}
