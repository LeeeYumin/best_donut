package com.example.demo.users;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class UsersVO {
	
	private String usersCode;
	private String usersName;
	private String position;
	private String localTel;
	private String usersStatus;
	
	private String perm1;
	private String perm2;
	private String perm3;
	private String perm4;
	private String perm5;
	
	private String keyword;
	private List<String> permList;
	private String status;
	
	private String uCode;
	
	@JsonIgnore
	private String perm;
	public String[] getPerm() {
//		return this.perm.split(",");
		return perm != null ? this.perm.split(",") : null;
	}
	
}