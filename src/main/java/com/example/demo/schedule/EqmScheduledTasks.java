package com.example.demo.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.notOpr.service.NotOprService;

@Component
public class EqmScheduledTasks {
	
	@Autowired
	NotOprService notOprService;
	
	@Scheduled(cron = "0 0 0 * * *")
	public void updateStatus() {
		notOprService.updateNotOpr(null);
	}
	
}

// 테스트 정보
// NOP10000
// EQM00010
// 정상 -> 설비수리(240416)
