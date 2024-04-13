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

	// I. 제품

	// 완제품 관리 페이지
	@GetMapping("productList")
	public String productList() {
		return "product/productList";
	}
	
	// 완제품출고관리 페이지
	@GetMapping("exportList")
	public String exportList() {
		return "product/exportList";
	}
	
	// 완제품출고등록 페이지
	@GetMapping("exportInsert")
	public String exportInsert() {
		return "product/exportInsert";
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
	
	// 제품상세목록조회
	@GetMapping("ajax/getProdLot")
	@ResponseBody
	public List<ProductDetailVO> getProdLot(String productCode){
		return productService.getProdLot(productCode);
	}
}