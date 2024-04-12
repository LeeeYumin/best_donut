package com.example.demo.product.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.product.ProductDetailVO;
import com.example.demo.product.ProductVO;
import com.example.demo.product.mapper.ProductMapper;
import com.example.demo.product.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired ProductMapper productMapper;
	
	@Override
	public List<ProductVO> getProduct() {
		return productMapper.getProduct();
	}

	@Override
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate) {
		return productMapper.getReqProd(dueStartDate, dueEndDate);
	}

	@Override
	public List<ProductDetailVO> getProdDet(ProductDetailVO vo) {
		return productMapper.getProdDet(vo);
	}

}
