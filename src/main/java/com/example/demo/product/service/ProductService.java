package com.example.demo.product.service;

import java.util.List;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.product.ProductDetailVO;
import com.example.demo.product.ProductInoutVO;
import com.example.demo.product.ProductVO;

public interface ProductService {

	// 1. 조회
	public List<ProductVO> getProduct();										// 제품조회
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate);	// 제품조회
	public List<ProductDetailVO> getProdDet(ProductDetailVO vo);				// 제품상세조회 
	public List<ProductDetailVO> getProdLot(String productCode);				// 제품상세조회
	public List<OrdersVO> getOrders(OrdersVO vo);								// 주문조회


	// 2. 등록
	public boolean insertInout(List<ProductInoutVO> list);						// 완제품출고등록
	public boolean updateOutCnt(List<OrdersDetailVO> list);
}
