package com.example.demo.product.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.product.ProductDetailVO;
import com.example.demo.product.ProductInoutVO;
import com.example.demo.product.ProductVO;
import com.example.demo.product.mapper.ProductMapper;
import com.example.demo.product.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired ProductMapper productMapper;
	
	// 1. 조회
	
	// 제품조회
	@Override
	public List<ProductVO> getProduct() {
		return productMapper.getProduct();
	}

	// 제품조회
	@Override
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate) {
		return productMapper.getReqProd(dueStartDate, dueEndDate);
	}

	// 제품상세조회
	@Override
	public List<ProductDetailVO> getProdDet(ProductDetailVO vo) {
		return productMapper.getProdDet(vo);
	}

	// 제품상세조회
	@Override
	public List<ProductDetailVO> getProdLot(String productCode) {
		return productMapper.getProdLot(productCode);
	}

	
	// 2. 등록
	
	// 완제품출고등록
	@Override
	public boolean insertInout(List<ProductInoutVO> list) {
		
		int result = 0;
		for(ProductInoutVO vo : list) {
			result += productMapper.insertInout(vo);
		}
		return result > 0 ? true : false;
	}

	@Override
	public boolean updateOutCnt(List<OrdersDetailVO> list) {
		
		int result = 0;
		
		for(OrdersDetailVO vo : list) {
			result += productMapper.updateOutCnt(vo.getProductCode(), vo.getOrdersCnt());
			result += productMapper.updateOrdStat(vo.getOrdersCode());
		}
		
		return result > 0 ? true : false;
	}
	
	

}
