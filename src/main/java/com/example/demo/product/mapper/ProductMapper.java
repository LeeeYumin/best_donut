package com.example.demo.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.product.ProductVO;

@Mapper
public interface ProductMapper {
	
	public List<ProductVO> getProduct();
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate);
}
