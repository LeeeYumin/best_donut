package com.example.demo.product.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.product.ProductDetailVO;
import com.example.demo.product.ProductVO;
import com.example.demo.product.service.ProductService;

@Controller
public class ProductController {
	
	@Autowired ProductService productService;
	
	// 완제품 관리 페이지
	@GetMapping("productList")
	public String productList() {
		return "product/productList";
	}
	
	// 제품목록조회
	@GetMapping("ajax/productList")
	@ResponseBody
	public List<ProductVO> getProductList() {
		return productService.getProduct();
	}
	
	// 제품목록조회
	@GetMapping("ajax/getReqProd")
	@ResponseBody
	public List<ProductVO> getReqProd(String dueStartDate, String dueEndDate) {
		return productService.getReqProd(dueStartDate, dueEndDate);
	}
	
	// 제품상세목록조회
	@PostMapping("ajax/getProdDet") 
	@ResponseBody
	public List<ProductDetailVO> getProdDet(ProductDetailVO vo) {
		return productService.getProdDet(vo);
	}
	
	// 자재상세목록조회
	
}