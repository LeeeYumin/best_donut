package com.example.demo.orders;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersVO {
	
	// DB 필드
	private String ordersCode;									// 주문코드
	@DateTimeFormat(pattern = "yyyy-MM-dd")									// vo 담을때					
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul") 				// 꺼내올때
	private Date ordersDate;									// 주문일자
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dueDate;										// 납기일자
	private Integer totalOrdersPrice;							// 총주문금
	private String ordersStatus;								// 주문상태
	private String usersCode;									// 담당자코드
	private String companyCode;									// 거래처코드
	
	// 추가 필드
	private List<OrdersDetailVO> ordDetList;					// 주문상세VO
	private String usersName;									// 담당자명
	private String companyName;									// 거래처명
	private String cntStr;	
	
	// 주문품목(~ 외 몇개)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dueStartDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")// 납기일검색시작일
	private Date dueEndDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")// 납기일검색종료일
	private Date ordersStartDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")// 주문일검색시작일
	private Date ordersEndDate;									// 주문일검색종료일
	
	private String result;										// 프로시저 결과값(0,1)
}
