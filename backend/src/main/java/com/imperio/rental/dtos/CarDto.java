package com.imperio.rental.dtos;

import org.springframework.web.multipart.MultipartFile;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
public class CarDto {
	
	
	private Long id;
    private String model;
    private String brand;
    private double pricePerDay;
    private Boolean isAvailable;
    private MultipartFile picture;
    
    
    
    public CarDto(String model, String brand, double pricePerDay,Boolean isAvailable, MultipartFile picture) {
		super();
		this.model = model;
		this.brand = brand;
		this.pricePerDay = pricePerDay;
		this.picture = picture;
		this.isAvailable= isAvailable!=null ? isAvailable : true; 
	}

}
