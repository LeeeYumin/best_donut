package com.example.demo.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.materials.service.MaterialsService;

@Component
public class MatScheduledTasks {
	
	@Autowired
	MaterialsService materialsService;
	
	// 발주 상태 업데이트(스케쥴러)
	@Scheduled(cron = "0 0 9-18/1 ? * MON-FRI")
	public void updateOrderStatus() {
		materialsService.updateMatOrderStatus();
	}
}
