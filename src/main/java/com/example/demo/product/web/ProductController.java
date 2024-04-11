package com.example.demo.product.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.product.ProductVO;
import com.example.demo.product.service.ProductService;

@Controller
public class ProductController {
	
	@Autowired ProductService productService;
	
	// 제품목록조회
	@GetMapping("ajax/productList")
	@ResponseBody
	public List<ProductVO> getProductList() {
		return productService.getProduct();
	}
	
	// 제품목록조회
	@GetMapping("ajax/getReqProd")
	@ResponseBody
	public List<ProductVO> getReqProd(ProductVO vo) {
		return productService.getReqProd(vo);
	}
}
