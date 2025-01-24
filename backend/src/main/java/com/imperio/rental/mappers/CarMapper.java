package com.imperio.rental.mappers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.imperio.rental.dtos.CarDto;
import com.imperio.rental.entities.Car;

@Service
public class CarMapper {
	public Car fromCarDto(CarDto car) throws IOException {
		
		Path path = Paths.get(System.getProperty("user.home"),"cars-app-files","cars-images");
		if(!Files.exists(path)) {
			Files.createDirectories(path);
		}
		String imageId = UUID.randomUUID().toString();
		Path imagePath = Paths.get(System.getProperty("user.home"),"cars-app-files","cars-images",imageId+".png");
		Files.copy(car.getPicture().getInputStream(),imagePath);
		
		
		
		
		Car returnedCar =Car.builder()
				.brand(car.getBrand())
				.model(car.getModel())
				.pricePerDay(car.getPricePerDay())
				.picture(imagePath.toUri().toString())
				.build();
		
		if(car.getId()!=null) {
			returnedCar.setId(car.getId());
		}
		
//		if the car is not available then it's explicitly set to be anavailable by admin then it should not be defaulted to true
		if(!car.isAvailable()) {
			
			returnedCar.setAvailable(false);
		}
		
		return returnedCar;
	}

}
