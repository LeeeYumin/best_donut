package com.example.demo.orders.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.orders.OrdersDetailVO;
import com.example.demo.orders.OrdersVO;
import com.example.demo.orders.ProdReqDetailVO;
import com.example.demo.orders.ProdReqVO;
import com.example.demo.orders.service.OrdersService;
import com.example.demo.product.service.ProductService;

@Controller
public class OrdersController {

	@Autowired OrdersService ordersService;
	@Autowired ProductService productService;
	
// I. 주문
	
	// 0. 페이지 이동
	
	// 테스트 페이지
	@GetMapping("ordersTest")
	public String ordersTest() {
		return "orders/ordersTest";
	}
	
	// 주문관리 페이지
	@GetMapping("ordersList")
	public String ordersMain() {
		return "orders/ordersList";
	}
	
	// 주문상세 페이지 
	@GetMapping("ordersDetail/{ordersCode}")
	public String ordersDetail(@PathVariable String ordersCode) {
		return "orders/ordersDetail";
	}
	
	// 주문등록 페이지
	@GetMapping("ordersInsert")
	public String insertOrders(Model model) {
		model.addAttribute("productList", productService.getProduct());
		return "orders/ordersInsert";
	}

	// 1. 조회
	
	// 거래처조회
	@GetMapping("ajax/getCompany")
	@ResponseBody
	public List<Map<String, Object>> getCompany() {
		return ordersService.getCompany();
	}
	
	// 주문조회
	@PostMapping("ajax/ordersList")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<OrdersVO> getOrders(@RequestBody OrdersVO vo){
		return ordersService.getOrders(vo);
	}
	
	@PostMapping("ajax/prodReqOrdersList")	// fetch 함수에 들어가는 uri
	@ResponseBody
	public List<OrdersVO> getProdReqOrders(@RequestBody OrdersVO vo){
		return ordersService.getProdReqOrders(vo);
	}
	
	// 주문상세조회
	@GetMapping("ajax/ordersDetail")
	@ResponseBody
	public List<OrdersDetailVO> getOrdersDetail(String ordersCode) {
		return ordersService.getOrdersDetail(ordersCode);
	}
		
	// 2. 등록
	
	// 주문등록
	@PostMapping("ajax/insertOrders")
	@ResponseBody
	public boolean insertOrders(@RequestBody OrdersVO vo) {
		return ordersService.insertOrders(vo);
	}

	// 3. 수정
	
	// 주문 수정
	@PostMapping("ajax/updateOrders")
	@ResponseBody
	public boolean updateOrders(@RequestBody OrdersVO vo) {
		return ordersService.updateOrders(vo);
	}
	
	// 주문상태 수정(확인/미확인)
	@PostMapping("ajax/updateOrdCheck")
	@ResponseBody
	public boolean updateOrdCheck(@RequestBody List<OrdersVO> list) {
		return ordersService.updateOrdCheck(list);
	}
	
	// 4. 삭제
	
	// 주문삭제
	@PostMapping("ajax/deleteOrders")
	@ResponseBody
	public int deleteOrders(@RequestBody String[] ordersCodes) {

		int result = 0;
		for(String ocode : ordersCodes) {
			if(ocode != "" && ocode != null) {
				ordersService.deleteOrdDet(ocode);
				result += ordersService.deleteOrders(ocode);
			}			
		}
		return result;
	}
	
	
// II. 생산요청
	
	// 1. 페이지 이동
	
	// 생산요청관리 페이지
	@GetMapping("prodReqList")
	public String prodReqList() {
		return "orders/prodReqList";
	}
	
	// 생산요청등록 페이지
	@GetMapping("prodReqInsert")
	public String prodReqInsert() {
		return "orders/prodReqInsert";
	}
	
	// 2. 조회
	
	// 생산요청조회
	@PostMapping("ajax/getProdReq")
	@ResponseBody
	public List<ProdReqVO> getProdReq(@RequestBody ProdReqVO vo){
		return ordersService.getProdReq(vo);
	}
	
	// 생산요청상세조회
	@GetMapping("ajax/getProdReqDet")
	@ResponseBody
	public List<ProdReqDetailVO> getProdReqDet(String prodReqCode){
		return ordersService.getProdReqDet(prodReqCode);
	}
	
	// 3. 등록
	
	// 생산요청등록
	@PostMapping("ajax/insertProdReq")
	@ResponseBody
	public boolean insertProdReq(@RequestBody ProdReqVO vo) {
		return ordersService.insertProdReq(vo);
	}
	
}