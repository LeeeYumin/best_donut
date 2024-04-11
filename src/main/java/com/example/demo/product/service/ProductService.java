package com.example.demo.product.service;

import java.util.List;

import com.example.demo.product.ProductVO;

public interface ProductService {

	public List<ProductVO> getProduct();
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate);
}
