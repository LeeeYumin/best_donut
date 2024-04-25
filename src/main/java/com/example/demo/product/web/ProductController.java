package com.example.demo.product.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.orders.OrdersVO;
import com.example.demo.product.ProductDetailVO;
import com.example.demo.product.ProductInoutVO;
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
	public List<ProductDetailVO> getProdDet(@RequestBody ProductDetailVO vo) {
		return productService.getProdDet(vo);
	}
	
	// 제품상세목록조회
	@GetMapping("ajax/getProdLot")
	@ResponseBody
	public List<ProductDetailVO> getProdLot(String productCode){
		return productService.getProdLot(productCode);
	}
	
	// 주문조회
	@PostMapping("ajax/getOrders")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<OrdersVO> getOrders(@RequestBody OrdersVO vo){
		return productService.getOrders(vo);
	}
	
	// 완제품입출고조회
	@PostMapping("ajax/getProdInout")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<ProductInoutVO> getProdInout(@RequestBody ProductInoutVO vo){
		return productService.getProdInout(vo);
	}
	
	// 완제품 LOT 별 자재 LOT 조회
	@GetMapping("ajax/getProdMat")
	@ResponseBody
	public List<Map<String, Object>> getProdMat(String productLotCode){
		return productService.getProdMat(productLotCode);
	}
	
	// 완제품 출고 등록 + 재고 수정
	@PostMapping("ajax/prodInoutProcess")
	@ResponseBody
	public int prodInoutProcess(@RequestBody OrdersVO vo) {
		return productService.prodInoutProcess(vo);
	}}
	
//	// 완제품출고등록
//	@PostMapping("ajax/insertInout")
//	@ResponseBody
//	public boolean insertInout(List<ProductInoutVO> list) {
//		return productService.insertInout(list);
//	}
//	
//	// 완제품출고시 재고량 update
//	@PostMapping("ajax/updateOutCnt")
//	@ResponseBody
//	public boolean updateOutCnt(List<OrdersDetailVO> list) {
//		return productService.updateOutCnt(list);
//	}
