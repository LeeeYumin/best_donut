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
	private String ordersCode;
	@DateTimeFormat(pattern = "yyyy-MM-dd")	// vo 담을떄
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul") // 꺼내올때
	private Date ordersDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone="Asia/Seoul")
	private Date dueDate;
	private Integer totalOrdersPrice;
	private String ordersStatus;
	private String usersCode;
	private String companyCode;
	
	// 추가 필드
	private List<OrdersDetailVO> ordDetList;
	private String usersName;
	private String companyName;
	private String cntStr;
	
	private Date dueStartDate;	
	private Date dueEndDate;
	private Date ordersStartDate;
	private Date ordersEndDate;
	
}
