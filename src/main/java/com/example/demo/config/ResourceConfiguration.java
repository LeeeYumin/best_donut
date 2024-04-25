package com.example.demo.config;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@PropertySource("classpath:application.properties")
public class ResourceConfiguration implements WebMvcConfigurer {

	@Value("${uploadFolder}") 
    private String uploadFolder;
	
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
    	String path = "file:///"+uploadFolder+"/";
	System.out.println("=============================================>>>>>>>>>>>>>>>>>>>>>"+ path);
        registry.addResourceHandler("/download/**")
      //  .addResourceLocations("file:///"+uploadFolder+"/") 
        .addResourceLocations(path)
        // 접근 파일 캐싱 시간 
	.setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES));
    }
}