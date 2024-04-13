package com.example.demo.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.product.ProductDetailVO;
import com.example.demo.product.ProductInoutVO;
import com.example.demo.product.ProductVO;

@Mapper
public interface ProductMapper {
	// 1. 조회
	public List<ProductVO> getProduct();										// 완제품조회
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate);	// 완제품조회
	public List<ProductDetailVO> getProdDet(ProductDetailVO vo);				// 완제품상세조회		
	public List<ProductDetailVO> getProdLot(String productCode);				// 완제품상세조회
	
	// 2. 등록
	public int insertInout(ProductInoutVO vo);									// 완제품출고등록
	
}
