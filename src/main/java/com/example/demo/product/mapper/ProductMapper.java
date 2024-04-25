package com.example.demo.product.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.orders.OrdersVO;
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
	public List<OrdersVO> getOrders(OrdersVO vo);								// 주문조회
	public List<Map<String, Object>> getProdMat(String productLotCode);
	public List<ProductInoutVO> getProdInout(ProductInoutVO vo);
	
	// 2. 등록
//	public int insertInout(ProductInoutVO vo);									// 완제품출고 등록
//	public int updateOutCnt(String productCode, int ordersCnt);					// 완제품출고 수량 update(프로시저)
//	public int updateOrdStat(String ordersCode);								// 완제품출고 주문상태 변경
//	public int prodInoutProcess(Map<String, Object> map);						// 완제품출고 수량 update(프로시저)
	public int prodInoutProcess(OrdersVO vo);						// 완제품출고 수량 update(프로시저)

}
